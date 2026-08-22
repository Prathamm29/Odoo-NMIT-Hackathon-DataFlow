'use server';

import bcrypt from 'bcryptjs';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { createSession, destroySession, getSession } from '@/lib/session';
import type { ActionResult, SignInResult } from '@/lib/types';

// ─── Sign Up (Register Company + Admin) ──────────────────────────────────────

export async function signUp(formData: FormData): Promise<ActionResult> {
  const companyName = formData.get('companyName') as string;
  const fullName = formData.get('fullName') as string;
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const confirmPassword = formData.get('confirmPassword') as string;

  // ── Validation ───────────────────────────────────────────────────────────
  if (!companyName || !fullName || !email || !password) {
    return { success: false, error: 'All fields are required.' };
  }

  if (password !== confirmPassword) {
    return { success: false, error: 'Passwords do not match.' };
  }

  if (password.length < 6) {
    return { success: false, error: 'Password must be at least 6 characters.' };
  }

  // Check for existing email
  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    return { success: false, error: 'An account with this email already exists.' };
  }

  // ── Create Company + Admin User + Profile ────────────────────────────────
  const passwordHash = await bcrypt.hash(password, 12);
  const [firstName, ...lastParts] = fullName.trim().split(' ');
  const lastName = lastParts.join(' ') || '';
  const loginId = email; // Admin's loginId = their email

  // Generate base 2-letter code
  const words = companyName.trim().split(/\s+/);
  let baseCode = '';
  if (words.length >= 2) {
    baseCode = (words[0][0] + words[1][0]).toUpperCase();
  } else {
    baseCode = companyName.length >= 2 ? companyName.substring(0, 2).toUpperCase() : companyName.padEnd(2, 'X').toUpperCase();
  }

  let code = baseCode;
  let counter = 0;
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

  // Ensure uniqueness
  while (true) {
    const existingCompany = await prisma.company.findUnique({ where: { code } });
    if (!existingCompany) break;
    
    code = baseCode[0] + chars[counter % chars.length];
    counter++;
    if (counter > chars.length * 2) {
       code = chars[Math.floor(Math.random() * 26)] + chars[Math.floor(Math.random() * 26)];
    }
  }

  const company = await prisma.company.create({
    data: {
      name: companyName,
      code,
      users: {
        create: {
          loginId,
          email,
          passwordHash,
          role: 'ADMIN',
          mustChangePassword: false,
          profile: {
            create: {
              firstName,
              lastName,
              jobTitle: 'Administrator',
              department: 'Management',
              dateOfJoining: new Date(),
              baseMonthlyWage: 0,
            },
          },
        },
      },
    },
    include: { users: true },
  });

  const adminUser = company.users[0];

  // ── Set session & redirect ───────────────────────────────────────────────
  await createSession({
    userId: adminUser.id,
    role: adminUser.role,
    companyId: company.id,
  });

  redirect('/dashboard');
}

// ─── Sign In ─────────────────────────────────────────────────────────────────

export async function signIn(formData: FormData): Promise<SignInResult> {
  const identifier = formData.get('identifier') as string;
  const password = formData.get('password') as string;

  if (!identifier || !password) {
    return { success: false, error: 'Login ID / Email and password are required.' };
  }

  // Look up by loginId or email
  const user = await prisma.user.findFirst({
    where: {
      OR: [
        { loginId: identifier },
        { email: identifier },
      ],
    },
  });

  if (!user) {
    return { success: false, error: 'Invalid credentials.' };
  }

  const passwordMatch = await bcrypt.compare(password, user.passwordHash);
  if (!passwordMatch) {
    return { success: false, error: 'Invalid credentials.' };
  }

  // If first login, return signal for password reset (don't set session yet)
  if (user.mustChangePassword) {
    return {
      success: true,
      data: { mustChangePassword: true, userId: user.id },
    };
  }

  // ── Set session & redirect ───────────────────────────────────────────────
  await createSession({
    userId: user.id,
    role: user.role,
    companyId: user.companyId,
  });

  redirect('/dashboard');
}

// ─── Change Password (first-login reset) ─────────────────────────────────────

export async function changePassword(formData: FormData): Promise<ActionResult> {
  const userId = formData.get('userId') as string;
  const newPassword = formData.get('newPassword') as string;
  const confirmNewPassword = formData.get('confirmNewPassword') as string;

  if (!userId || !newPassword) {
    return { success: false, error: 'All fields are required.' };
  }

  if (newPassword !== confirmNewPassword) {
    return { success: false, error: 'Passwords do not match.' };
  }

  if (newPassword.length < 6) {
    return { success: false, error: 'Password must be at least 6 characters.' };
  }

  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) {
    return { success: false, error: 'User not found.' };
  }

  const passwordHash = await bcrypt.hash(newPassword, 12);
  await prisma.user.update({
    where: { id: userId },
    data: { passwordHash, mustChangePassword: false },
  });

  // Set session after password change
  await createSession({
    userId: user.id,
    role: user.role,
    companyId: user.companyId,
  });

  redirect('/dashboard');
}

// ─── Sign Out ────────────────────────────────────────────────────────────────

export async function signOut(): Promise<void> {
  await destroySession();
  redirect('/sign-in');
}

// ─── Get Current Session (helper for client components) ──────────────────────

export async function getCurrentSession() {
  return getSession();
}
