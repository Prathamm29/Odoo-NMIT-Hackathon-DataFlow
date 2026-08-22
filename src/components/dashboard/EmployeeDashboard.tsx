import Link from "next/link";
import { UserIcon, ClockIcon, CalendarIcon, ArrowRightOnRectangleIcon } from "@heroicons/react/24/outline";
import { signOut } from "@/actions/auth.actions";
import type { EmployeeDTO } from "@/lib/types";

export default function EmployeeDashboard({ employee }: { employee: EmployeeDTO }) {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Welcome, {employee.firstName}!</h1>
        <p className="text-gray-600 mt-1">Here is a quick overview of your day.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <Link href={`/profile/${employee.id}`} className="block">
          <div className="bg-white border border-gray-300 p-6 flex flex-col items-center text-center hover:bg-gray-50 h-full">
            <UserIcon className="w-12 h-12 text-gray-700 mb-4" />
            <h3 className="text-lg font-bold text-gray-900">My Profile</h3>
            <p className="text-sm text-gray-500 mt-2">View your personal details and salary.</p>
          </div>
        </Link>
        
        <Link href="/attendance/employee" className="block">
          <div className="bg-white border border-gray-300 p-6 flex flex-col items-center text-center hover:bg-gray-50 h-full">
            <ClockIcon className="w-12 h-12 text-gray-700 mb-4" />
            <h3 className="text-lg font-bold text-gray-900">Attendance</h3>
            <p className="text-sm text-gray-500 mt-2">Check your logs and work hours.</p>
          </div>
        </Link>

        <Link href="/time-off/employee" className="block">
          <div className="bg-white border border-gray-300 p-6 flex flex-col items-center text-center hover:bg-gray-50 h-full">
            <CalendarIcon className="w-12 h-12 text-gray-700 mb-4" />
            <h3 className="text-lg font-bold text-gray-900">Leave Requests</h3>
            <p className="text-sm text-gray-500 mt-2">Apply for time off and check status.</p>
          </div>
        </Link>

        <form action={signOut} className="block h-full">
          <button type="submit" className="w-full h-full bg-white border border-gray-300 p-6 flex flex-col items-center text-center hover:bg-gray-50 cursor-pointer">
            <ArrowRightOnRectangleIcon className="w-12 h-12 text-red-600 mb-4" />
            <h3 className="text-lg font-bold text-gray-900">Logout</h3>
            <p className="text-sm text-gray-500 mt-2">Securely sign out of your account.</p>
          </button>
        </form>
      </div>

      <div className="bg-blue-50 border border-blue-200 p-6">
        <h3 className="text-blue-800 font-bold mb-2">Notice Board</h3>
        <p className="text-sm text-blue-700">Remember to log your attendance daily! Use the quick check-in buttons at the top of the screen.</p>
      </div>
    </div>
  );
}
