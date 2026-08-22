





export type ActionResult<T = void> = {
  success: true;
  data?: T;
} | {
  success: false;
  error: string;
};



export type SessionPayload = {
  userId: string;
  role: 'ADMIN' | 'EMPLOYEE';
  companyId: string;
};



export type SignInResult = ActionResult<{
  mustChangePassword: boolean;
  userId?: string;
}>;



export type EmployeeDTO = {
  id: string;
  loginId: string;
  email: string;
  role: 'ADMIN' | 'EMPLOYEE';
  firstName: string;
  lastName: string;
  jobTitle: string | null;
  department: string | null;
  dateOfJoining: string; 
  baseMonthlyWage: number;
};

export type EmployeeProfileDTO = EmployeeDTO & {
  companyName: string;
};

export type AddEmployeeResult = ActionResult<{
  loginId: string;
  temporaryPassword: string;
}>;



export type AttendanceDTO = {
  id: string;
  userId: string;
  employeeName?: string; 
  date: string;          
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



export type LeaveRequestDTO = {
  id: string;
  userId: string;
  employeeName?: string; 
  leaveType: 'PAID' | 'SICK' | 'UNPAID';
  startDate: string;     
  endDate: string;       
  allocationDays: number;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  attachmentUrl: string | null;
  remarks: string | null;
};
