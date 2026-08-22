'use server';

import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/session';
import type { ActionResult, AddEmployeeResult, EmployeeDTO, EmployeeProfileDTO } from '@/lib/types';

// ─── Helper: Generate a readable temporary password ──────────────────────────

function generateTempPassword(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789';
  let password = '';
  for (let i = 0; i < 10; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return password;
}

// ─── Helper: Generate a loginId from name ────────────────────────────────────

function generateLoginId(firstName: string, lastName: string, companyName: string): string {
  const base = `${firstName.toLowerCase()}.${lastName.toLowerCase()}`;
  const suffix = companyName.substring(0, 3).toLowerCase();
  const rand = Math.floor(Math.random() * 100);
  return `${base}.${suffix}${rand}`;
}

// ─── Add Employee (Admin-only) ───────────────────────────────────────────────

export async function addEmployee(formData: FormData): Promise<AddEmployeeResult> {
  const session = await getSession();
  if (!session || session.role !== 'ADMIN') {
    return { success: false, error: 'Unauthorized. Admin access required.' };
  }

  const firstName = formData.get('firstName') as string;
  const lastName = formData.get('lastName') as string;
  const email = formData.get('email') as string;
  const jobTitle = (formData.get('jobTitle') as string) || null;
  const department = (formData.get('department') as string) || null;
  const baseMonthlyWage = parseFloat(formData.get('baseMonthlyWage') as string) || 0;

  if (!firstName || !lastName || !email) {
    return { success: false, error: 'First name, last name, and email are required.' };
  }

  // Check for duplicate email
  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    return { success: false, error: 'An employee with this email already exists.' };
  }

  // Fetch company name for loginId generation
  const company = await prisma.company.findUnique({
    where: { id: session.companyId },
  });

  const tempPassword = generateTempPassword();
  const passwordHash = await bcrypt.hash(tempPassword, 12);
  const loginId = generateLoginId(firstName, lastName, company?.name ?? 'co');

  await prisma.user.create({
    data: {
      loginId,
      email,
      passwordHash,
      role: 'EMPLOYEE',
      mustChangePassword: true,
      companyId: session.companyId,
      profile: {
        create: {
          firstName,
          lastName,
          jobTitle,
          department,
          dateOfJoining: new Date(),
          baseMonthlyWage,
        },
      },
    },
  });

  return {
    success: true,
    data: { loginId, temporaryPassword: tempPassword },
  };
}

// ─── Get All Employees in Company ────────────────────────────────────────────

export async function getEmployees(): Promise<ActionResult<EmployeeDTO[]>> {
  const session = await getSession();
  if (!session) {
    return { success: false, error: 'Not authenticated.' };
  }

  const users = await prisma.user.findMany({
    where: { companyId: session.companyId },
    include: { profile: true },
    orderBy: { profile: { firstName: 'asc' } },
  });

  const employees: EmployeeDTO[] = users
    .filter((u) => u.profile !== null)
    .map((u) => ({
      id: u.id,
      loginId: u.loginId,
      email: u.email,
      role: u.role,
      firstName: u.profile!.firstName,
      lastName: u.profile!.lastName,
      jobTitle: u.profile!.jobTitle,
      department: u.profile!.department,
      dateOfJoining: u.profile!.dateOfJoining.toISOString(),
      baseMonthlyWage: u.profile!.baseMonthlyWage,
    }));

  return { success: true, data: employees };
}

// ─── Get Single Employee Profile ─────────────────────────────────────────────

export async function getEmployeeProfile(userId: string): Promise<ActionResult<EmployeeProfileDTO>> {
  const session = await getSession();
  if (!session) {
    return { success: false, error: 'Not authenticated.' };
  }

  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: {
      profile: true,
      company: true,
    },
  });

  if (!user || !user.profile) {
    return { success: false, error: 'Employee not found.' };
  }

  // Employees can only view profiles within their company
  if (user.companyId !== session.companyId) {
    return { success: false, error: 'Access denied.' };
  }

  return {
    success: true,
    data: {
      id: user.id,
      loginId: user.loginId,
      email: user.email,
      role: user.role,
      firstName: user.profile.firstName,
      lastName: user.profile.lastName,
      jobTitle: user.profile.jobTitle,
      department: user.profile.department,
      dateOfJoining: user.profile.dateOfJoining.toISOString(),
      baseMonthlyWage: user.profile.baseMonthlyWage,
      companyName: user.company.name,
    },
  };
}
