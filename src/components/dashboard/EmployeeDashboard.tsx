import Link from "next/link";
import { UserIcon, ClockIcon, CalendarIcon, ArrowRightOnRectangleIcon } from "@heroicons/react/24/outline";
import { signOut } from "@/actions/auth.actions";
import type { EmployeeDTO } from "@/lib/types";

export default function EmployeeDashboard({ employee }: { employee: EmployeeDTO }) {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
          Welcome back, {employee.firstName}
        </h1>
        <p className="text-gray-500 mt-1 text-sm">
          Here's what's happening with your attendance and time off today.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Link href={`/profile/${employee.id}`} className="block group">
          <div className="bg-white border border-gray-200 rounded-xl p-6 h-full shadow-sm group-hover:shadow-md group-hover:border-gray-300 transition-all duration-200 flex flex-col items-center text-center">
            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-4 group-hover:bg-blue-100 transition-colors">
              <UserIcon className="w-6 h-6" />
            </div>
            <h3 className="text-base font-semibold text-gray-900 mb-1">My Profile</h3>
            <p className="text-sm text-gray-500">View your personnel data</p>
          </div>
        </Link>
        
        <Link href="/attendance/employee" className="block group">
          <div className="bg-white border border-gray-200 rounded-xl p-6 h-full shadow-sm group-hover:shadow-md group-hover:border-gray-300 transition-all duration-200 flex flex-col items-center text-center">
            <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center mb-4 group-hover:bg-indigo-100 transition-colors">
              <ClockIcon className="w-6 h-6" />
            </div>
            <h3 className="text-base font-semibold text-gray-900 mb-1">Attendance</h3>
            <p className="text-sm text-gray-500">Check logs & hours</p>
          </div>
        </Link>

        <Link href="/time-off/employee" className="block group">
          <div className="bg-white border border-gray-200 rounded-xl p-6 h-full shadow-sm group-hover:shadow-md group-hover:border-gray-300 transition-all duration-200 flex flex-col items-center text-center">
            <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-full flex items-center justify-center mb-4 group-hover:bg-purple-100 transition-colors">
              <CalendarIcon className="w-6 h-6" />
            </div>
            <h3 className="text-base font-semibold text-gray-900 mb-1">Leave Requests</h3>
            <p className="text-sm text-gray-500">Apply & verify status</p>
          </div>
        </Link>

        <form action={signOut} className="block h-full group">
          <button type="submit" className="w-full h-full bg-white border border-gray-200 rounded-xl p-6 shadow-sm group-hover:shadow-md group-hover:border-gray-300 transition-all duration-200 flex flex-col items-center text-center">
            <div className="w-12 h-12 bg-gray-50 text-gray-600 rounded-full flex items-center justify-center mb-4 group-hover:bg-gray-100 transition-colors">
              <ArrowRightOnRectangleIcon className="w-6 h-6" />
            </div>
            <h3 className="text-base font-semibold text-gray-900 mb-1">Log out</h3>
            <p className="text-sm text-gray-500">Securely end session</p>
          </button>
        </form>
      </div>

      <div className="bg-blue-50 border border-blue-100 rounded-xl p-6">
        <h3 className="text-blue-900 font-semibold mb-2">Notice Board</h3>
        <p className="text-sm text-blue-800 leading-relaxed">
          Remember to log your attendance daily. Use the quick check-in buttons in the navigation bar to register your time accurately.
        </p>
      </div>
    </div>
  );
}
