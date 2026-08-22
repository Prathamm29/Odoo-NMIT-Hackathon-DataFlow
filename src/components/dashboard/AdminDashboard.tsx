import Link from "next/link";
import { UserIcon } from "@heroicons/react/24/solid";
import AddEmployeeModal from "./AddEmployeeModal";
import type { EmployeeDTO } from "@/lib/types";

export default function AdminDashboard({ employees }: { employees: EmployeeDTO[] }) {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Administration</h1>
          <p className="text-gray-500 mt-1 text-sm">Global command & control</p>
        </div>
        <AddEmployeeModal />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
        <Link href="/attendance/admin" className="block group">
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm group-hover:shadow-md group-hover:border-gray-300 transition-all duration-200 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Attendance Logs</h2>
              <p className="text-sm text-gray-500 mt-1">View company-wide data</p>
            </div>
            <div className="text-gray-400 group-hover:text-gray-600 transition-colors">&rarr;</div>
          </div>
        </Link>
        <Link href="/time-off/admin" className="block group">
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm group-hover:shadow-md group-hover:border-gray-300 transition-all duration-200 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Leave Approvals</h2>
              <p className="text-sm text-gray-500 mt-1">Process pending requests</p>
            </div>
            <div className="text-gray-400 group-hover:text-gray-600 transition-colors">&rarr;</div>
          </div>
        </Link>
      </div>

      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Personnel Directory</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {employees.map((employee) => (
          <Link key={employee.id} href={`/profile/${employee.id}`} className="block group">
            <div className="bg-white border border-gray-200 rounded-xl p-6 h-full shadow-sm group-hover:shadow-md group-hover:border-gray-300 transition-all duration-200 flex flex-col items-center text-center">
              <div className="relative mb-4">
                <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center border border-gray-200">
                  <UserIcon className="w-8 h-8 text-gray-400" />
                </div>
              </div>
              
              <h3 className="text-base font-semibold text-gray-900 mb-1">
                {employee.firstName} {employee.lastName}
              </h3>
              <p className="text-sm font-medium text-gray-700">{employee.jobTitle || 'Employee'}</p>
              <p className="text-xs text-gray-500 mt-2 tracking-wide uppercase">{employee.department || 'N/A'}</p>
            </div>
          </Link>
        ))}

        {employees.length === 0 && (
          <div className="col-span-full py-12 text-center bg-white border border-gray-200 border-dashed rounded-xl">
            <p className="text-sm text-gray-500">No personnel found.</p>
          </div>
        )}
      </div>
    </div>
  );
}
