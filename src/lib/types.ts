// ─── Shared Types & DTOs ─────────────────────────────────────────────────────
// These types are used across server actions and client components.
// They intentionally avoid exposing Prisma model types to the client.

// ─── Generic Action Result ───────────────────────────────────────────────────

export type ActionResult<T = void> = {
  success: true;
  data?: T;
} | {
  success: false;
  error: string;
};

// ─── Session ─────────────────────────────────────────────────────────────────

export type SessionPayload = {
  userId: string;
  role: 'ADMIN' | 'EMPLOYEE';
  companyId: string;
};

// ─── Auth ────────────────────────────────────────────────────────────────────

export type SignInResult = ActionResult<{
  mustChangePassword: boolean;
  userId?: string;
}>;

// ─── Employee / Profile ──────────────────────────────────────────────────────

export type EmployeeDTO = {
  id: string;
  loginId: string;
  email: string;
  role: 'ADMIN' | 'EMPLOYEE';
  firstName: string;
  lastName: string;
  jobTitle: string | null;
  department: string | null;
  dateOfJoining: string; // ISO string
  baseMonthlyWage: number;
};

export type EmployeeProfileDTO = EmployeeDTO & {
  companyName: string;
};

export type AddEmployeeResult = ActionResult<{
  loginId: string;
  temporaryPassword: string;
}>;

// ─── Attendance ──────────────────────────────────────────────────────────────

export type AttendanceDTO = {
  id: string;
  userId: string;
  employeeName?: string; // populated in admin view
  date: string;          // ISO string
  checkIn: string | null;
  checkOut: string | null;
  workHours: number | null;
  extraHours: number | null;
  status: 'PRESENT' | 'ABSENT' | 'HALF_DAY' | 'LEAVE';
};

export type TodayStatusDTO = {
  isCheckedIn: boolean;
  checkInTime: string | null;
  checkOutTime: string | null;
  attendanceId: string | null;
};

// ─── Leave ───────────────────────────────────────────────────────────────────

export type LeaveRequestDTO = {
  id: string;
  userId: string;
  employeeName?: string; // populated in admin view
  leaveType: 'PAID' | 'SICK' | 'UNPAID';
  startDate: string;     // ISO string
  endDate: string;       // ISO string
  allocationDays: number;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  attachmentUrl: string | null;
  remarks: string | null;
};
