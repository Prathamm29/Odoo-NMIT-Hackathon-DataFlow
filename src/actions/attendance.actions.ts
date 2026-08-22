'use server';

import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/session';
import type { ActionResult, AttendanceDTO, TodayStatusDTO } from '@/lib/types';



const STANDARD_WORK_HOURS = 8;



function getTodayDate(): Date {
  const now = new Date();
  return new Date(Date.UTC(now.getFullYear(), now.getMonth(), now.getDate()));
}



function toAttendanceDTO(
  record: {
    id: string;
    userId: string;
    date: Date;
    checkIn: Date | null;
    checkOut: Date | null;
    workHours: number | null;
    extraHours: number | null;
    status: string;
  },
  employeeName?: string
): AttendanceDTO {
  return {
    id: record.id,
    userId: record.userId,
    employeeName,
    date: record.date.toISOString(),
    checkIn: record.checkIn?.toISOString() ?? null,
    checkOut: record.checkOut?.toISOString() ?? null,
    workHours: record.workHours,
    extraHours: record.extraHours,
    status: record.status as AttendanceDTO['status'],
  };
}



export async function checkIn(): Promise<ActionResult<AttendanceDTO>> {
  const session = await getSession();
  if (!session) {
    return { success: false, error: 'Not authenticated.' };
  }

  const today = getTodayDate();
  const now = new Date();

  
  const attendance = await prisma.attendance.upsert({
    where: {
      userId_date: {
        userId: session.userId,
        date: today,
      },
    },
    create: {
      userId: session.userId,
      date: today,
      checkIn: now,
      status: 'PRESENT',
    },
    update: {
      checkIn: now,
      checkOut: null,
      workHours: null,
      extraHours: null,
      status: 'PRESENT',
    },
  });

  return { success: true, data: toAttendanceDTO(attendance) };
}



export async function checkOut(): Promise<ActionResult<AttendanceDTO>> {
  const session = await getSession();
  if (!session) {
    return { success: false, error: 'Not authenticated.' };
  }

  const today = getTodayDate();
  const now = new Date();

  
  const attendance = await prisma.attendance.findUnique({
    where: {
      userId_date: {
        userId: session.userId,
        date: today,
      },
    },
  });

  if (!attendance) {
    return { success: false, error: 'You must check in before checking out.' };
  }

  if (!attendance.checkIn) {
    return { success: false, error: 'No check-in found for today.' };
  }

  
  const diffMs = now.getTime() - attendance.checkIn.getTime();
  const workHours = parseFloat((diffMs / (1000 * 60 * 60)).toFixed(2));
  const extraHours = parseFloat(Math.max(0, workHours - STANDARD_WORK_HOURS).toFixed(2));

  
  let status: 'PRESENT' | 'HALF_DAY' = 'PRESENT';
  if (workHours < STANDARD_WORK_HOURS / 2) {
    status = 'HALF_DAY';
  }

  const updated = await prisma.attendance.update({
    where: { id: attendance.id },
    data: {
      checkOut: now,
      workHours,
      extraHours,
      status,
    },
  });

  return { success: true, data: toAttendanceDTO(updated) };
}



export async function getTodayStatus(): Promise<ActionResult<TodayStatusDTO>> {
  const session = await getSession();
  if (!session) {
    return { success: false, error: 'Not authenticated.' };
  }

  const today = getTodayDate();

  const attendance = await prisma.attendance.findUnique({
    where: {
      userId_date: {
        userId: session.userId,
        date: today,
      },
    },
  });

  if (!attendance) {
    return {
      success: true,
      data: {
        isCheckedIn: false,
        checkInTime: null,
        checkOutTime: null,
        attendanceId: null,
      },
    };
  }

  return {
    success: true,
    data: {
      isCheckedIn: attendance.checkIn !== null && attendance.checkOut === null,
      checkInTime: attendance.checkIn?.toISOString() ?? null,
      checkOutTime: attendance.checkOut?.toISOString() ?? null,
      attendanceId: attendance.id,
    },
  };
}



export async function getMyAttendance(
  month?: number,
  year?: number
): Promise<ActionResult<AttendanceDTO[]>> {
  const session = await getSession();
  if (!session) {
    return { success: false, error: 'Not authenticated.' };
  }

  const now = new Date();
  const targetMonth = month ?? now.getMonth(); 
  const targetYear = year ?? now.getFullYear();

  const startDate = new Date(Date.UTC(targetYear, targetMonth, 1));
  const endDate = new Date(Date.UTC(targetYear, targetMonth + 1, 0)); 

  const records = await prisma.attendance.findMany({
    where: {
      userId: session.userId,
      date: {
        gte: startDate,
        lte: endDate,
      },
    },
    orderBy: { date: 'desc' },
  });

  return {
    success: true,
    data: records.map((r) => toAttendanceDTO(r)),
  };
}



export async function getAllAttendance(
  dateStr?: string
): Promise<ActionResult<AttendanceDTO[]>> {
  const session = await getSession();
  if (!session || session.role !== 'ADMIN') {
    return { success: false, error: 'Unauthorized. Admin access required.' };
  }

  
  const targetDate = dateStr ? new Date(dateStr) : getTodayDate();

  const records = await prisma.attendance.findMany({
    where: {
      date: targetDate,
      user: {
        companyId: session.companyId,
      },
    },
    include: {
      user: {
        include: { profile: true },
      },
    },
    orderBy: {
      user: { profile: { firstName: 'asc' } },
    },
  });

  return {
    success: true,
    data: records.map((r) => {
      const name = r.user.profile
        ? `${r.user.profile.firstName} ${r.user.profile.lastName}`
        : r.user.email;
      return toAttendanceDTO(r, name);
    }),
  };
}
