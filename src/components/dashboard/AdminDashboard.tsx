import Link from "next/link";
import { UserIcon } from "@heroicons/react/24/solid";
import AddEmployeeModal from "./AddEmployeeModal";
import type { EmployeeDTO } from "@/lib/types";

export default function AdminDashboard({ employees }: { employees: EmployeeDTO[] }) {
  return (
    <div>
      <div className="mb-8 flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600 mt-1">Manage employees, attendance, and leave requests.</p>
        </div>
        <AddEmployeeModal />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        <Link href="/attendance/admin" className="block">
          <div className="bg-white border border-gray-300 p-6 hover:bg-gray-50 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-gray-900">Attendance Records</h2>
              <p className="text-sm text-gray-600 mt-1">View and manage company-wide attendance.</p>
            </div>
            <div className="text-gray-400 font-bold">&rarr;</div>
          </div>
        </Link>
        <Link href="/time-off/admin" className="block">
          <div className="bg-white border border-gray-300 p-6 hover:bg-gray-50 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-gray-900">Leave Approvals</h2>
              <p className="text-sm text-gray-600 mt-1">Review pending leave requests.</p>
            </div>
            <div className="text-gray-400 font-bold">&rarr;</div>
          </div>
        </Link>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-900">Employee Directory</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {employees.map((employee) => (
          <Link key={employee.id} href={`/profile/${employee.id}`} className="block">
            <div className="bg-white border border-gray-300 p-6 flex flex-col items-center text-center hover:bg-gray-50 cursor-pointer h-full">
              <div className="relative mb-4">
                <div className="w-20 h-20 bg-gray-200 border border-gray-300 flex items-center justify-center">
                  <UserIcon className="w-10 h-10 text-gray-400" />
                </div>
              </div>
              
              <h3 className="text-lg font-bold text-gray-900 mb-1">
                {employee.firstName} {employee.lastName}
              </h3>
              <p className="text-sm font-medium text-gray-700">{employee.jobTitle || 'Employee'}</p>
              <p className="text-xs text-gray-500 mt-2 uppercase tracking-wide">{employee.department || 'N/A'}</p>
            </div>
          </Link>
        ))}

        {employees.length === 0 && (
          <div className="col-span-full py-12 text-center text-gray-500 border-2 border-dashed border-gray-300">
            No employees found in your company.
          </div>
        )}
      </div>
    </div>
  );
}
