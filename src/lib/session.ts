'use server';

import { cookies } from 'next/headers';
import type { SessionPayload } from './types';

const COOKIE_NAME = 'dayflow-session';
const COOKIE_MAX_AGE = 60 * 60 * 24 * 7; 


export async function createSession(payload: SessionPayload): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, JSON.stringify(payload), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: COOKIE_MAX_AGE,
  });
}


export async function getSession(): Promise<SessionPayload | null> {
  const cookieStore = await cookies();
  const cookie = cookieStore.get(COOKIE_NAME);

  if (!cookie?.value) {
    return null;
  }

  try {
    const payload = JSON.parse(cookie.value) as SessionPayload;
    
    if (payload.userId && payload.role && payload.companyId) {
      return payload;
    }
    return null;
  } catch {
    return null;
  }
}


export async function destroySession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}
