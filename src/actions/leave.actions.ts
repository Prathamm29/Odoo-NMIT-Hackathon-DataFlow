'use server';

import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/session';
import type { ActionResult, LeaveRequestDTO } from '@/lib/types';



function toLeaveDTO(
  record: {
    id: string;
    userId: string;
    leaveType: string;
    startDate: Date;
    endDate: Date;
    allocationDays: number;
    status: string;
    attachmentUrl: string | null;
    remarks: string | null;
  },
  employeeName?: string
): LeaveRequestDTO {
  return {
    id: record.id,
    userId: record.userId,
    employeeName,
    leaveType: record.leaveType as LeaveRequestDTO['leaveType'],
    startDate: record.startDate.toISOString(),
    endDate: record.endDate.toISOString(),
    allocationDays: record.allocationDays,
    status: record.status as LeaveRequestDTO['status'],
    attachmentUrl: record.attachmentUrl,
    remarks: record.remarks,
  };
}



export async function requestLeave(formData: FormData): Promise<ActionResult> {
  const session = await getSession();
  if (!session) {
    return { success: false, error: 'Not authenticated.' };
  }

  const leaveType = formData.get('leaveType') as string;
  const startDateStr = formData.get('startDate') as string;
  const endDateStr = formData.get('endDate') as string;
  const allocationDays = parseFloat(formData.get('allocationDays') as string);
  const remarks = (formData.get('remarks') as string) || null;

  
  if (!leaveType || !startDateStr || !endDateStr || !allocationDays) {
    return { success: false, error: 'All required fields must be filled.' };
  }

  const validTypes = ['PAID', 'SICK', 'UNPAID'];
  if (!validTypes.includes(leaveType)) {
    return { success: false, error: 'Invalid leave type.' };
  }

  const startDate = new Date(startDateStr);
  const endDate = new Date(endDateStr);

  if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
    return { success: false, error: 'Invalid date format.' };
  }

  if (startDate > endDate) {
    return { success: false, error: 'Start date must be before or equal to end date.' };
  }

  if (allocationDays <= 0) {
    return { success: false, error: 'Allocation days must be positive.' };
  }

  
  await prisma.leaveRequest.create({
    data: {
      userId: session.userId,
      leaveType: leaveType as 'PAID' | 'SICK' | 'UNPAID',
      startDate,
      endDate,
      allocationDays,
      status: 'PENDING',
      remarks,
    },
  });

  return { success: true };
}



export async function getMyLeaves(): Promise<ActionResult<LeaveRequestDTO[]>> {
  const session = await getSession();
  if (!session) {
    return { success: false, error: 'Not authenticated.' };
  }

  const requests = await prisma.leaveRequest.findMany({
    where: { userId: session.userId },
    orderBy: { startDate: 'desc' },
  });

  return {
    success: true,
    data: requests.map((r) => toLeaveDTO(r)),
  };
}



export async function getAllLeaveRequests(): Promise<ActionResult<LeaveRequestDTO[]>> {
  const session = await getSession();
  if (!session || session.role !== 'ADMIN') {
    return { success: false, error: 'Unauthorized. Admin access required.' };
  }

  const requests = await prisma.leaveRequest.findMany({
    where: {
      user: {
        companyId: session.companyId,
      },
    },
    include: {
      user: {
        include: { profile: true },
      },
    },
    orderBy: { startDate: 'desc' },
  });

  return {
    success: true,
    data: requests.map((r) => {
      const name = r.user.profile
        ? `${r.user.profile.firstName} ${r.user.profile.lastName}`
        : r.user.email;
      return toLeaveDTO(r, name);
    }),
  };
}



export async function updateLeaveStatus(
  requestId: string,
  newStatus: 'APPROVED' | 'REJECTED'
): Promise<ActionResult> {
  const session = await getSession();
  if (!session || session.role !== 'ADMIN') {
    return { success: false, error: 'Unauthorized. Admin access required.' };
  }

  
  const leaveRequest = await prisma.leaveRequest.findUnique({
    where: { id: requestId },
    include: {
      user: true,
    },
  });

  if (!leaveRequest) {
    return { success: false, error: 'Leave request not found.' };
  }

  
  if (leaveRequest.user.companyId !== session.companyId) {
    return { success: false, error: 'Access denied.' };
  }

  if (leaveRequest.status !== 'PENDING') {
    return { success: false, error: 'This request has already been processed.' };
  }

  
  await prisma.leaveRequest.update({
    where: { id: requestId },
    data: { status: newStatus },
  });

  
  if (newStatus === 'APPROVED') {
    const start = new Date(leaveRequest.startDate);
    const end = new Date(leaveRequest.endDate);

    const attendanceRecords: {
      userId: string;
      date: Date;
      status: 'LEAVE';
    }[] = [];

    const current = new Date(start);
    while (current <= end) {
      
      const dayOfWeek = current.getUTCDay();
      if (dayOfWeek !== 0 && dayOfWeek !== 6) {
        attendanceRecords.push({
          userId: leaveRequest.userId,
          date: new Date(Date.UTC(current.getUTCFullYear(), current.getUTCMonth(), current.getUTCDate())),
          status: 'LEAVE',
        });
      }
      current.setUTCDate(current.getUTCDate() + 1);
    }

    
    for (const record of attendanceRecords) {
      await prisma.attendance.upsert({
        where: {
          userId_date: {
            userId: record.userId,
            date: record.date,
          },
        },
        create: {
          userId: record.userId,
          date: record.date,
          status: 'LEAVE',
        },
        update: {
          status: 'LEAVE',
          checkIn: null,
          checkOut: null,
          workHours: null,
          extraHours: null,
        },
      });
    }
  }

  return { success: true };
}
