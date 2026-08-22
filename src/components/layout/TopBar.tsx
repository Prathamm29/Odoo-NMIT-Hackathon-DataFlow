"use client";

import Link from "next/link";
import { useState, useTransition } from "react";
import { UserCircleIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import { checkIn, checkOut } from "@/actions/attendance.actions";
import { signOut } from "@/actions/auth.actions";
import { useRouter } from "next/navigation";
import type { TodayStatusDTO } from "@/lib/types";

export default function TopBar({ 
  initialStatus, 
  user 
}: { 
  initialStatus: TodayStatusDTO,
  user: { name: string, role: string }
}) {
  const router = useRouter();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isCheckedIn, setIsCheckedIn] = useState(initialStatus.isCheckedIn);
  const [isPending, startTransition] = useTransition();

  const handleCheckIn = async () => {
    startTransition(async () => {
      const result = await checkIn();
      if (result.success) {
        setIsCheckedIn(true);
        router.refresh();
      }
    });
  };

  const handleCheckOut = async () => {
    startTransition(async () => {
      const result = await checkOut();
      if (result.success) {
        setIsCheckedIn(false);
        router.refresh();
      }
    });
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            {}
            <div className="flex-shrink-0 flex items-center pr-6">
              <span className="text-xl font-bold tracking-tight text-gray-900">Dayflow</span>
            </div>
            
            {}
            <nav className="hidden md:flex space-x-1 border-l border-gray-200 pl-6 h-full items-center">
              <Link href="/dashboard" className="text-gray-600 px-3 py-2 text-sm font-medium rounded-md hover:bg-gray-50 hover:text-gray-900 transition-colors">
                Directory
              </Link>
              {user.role === "ADMIN" ? (
                <>
                  <Link href="/attendance/admin" className="text-gray-600 px-3 py-2 text-sm font-medium rounded-md hover:bg-gray-50 hover:text-gray-900 transition-colors">
                    Attendance Admin
                  </Link>
                  <Link href="/time-off/admin" className="text-gray-600 px-3 py-2 text-sm font-medium rounded-md hover:bg-gray-50 hover:text-gray-900 transition-colors">
                    Time Off Admin
                  </Link>
                </>
              ) : (
                <>
                  <Link href="/attendance/employee" className="text-gray-600 px-3 py-2 text-sm font-medium rounded-md hover:bg-gray-50 hover:text-gray-900 transition-colors">
                    Attendance
                  </Link>
                  <Link href="/time-off/employee" className="text-gray-600 px-3 py-2 text-sm font-medium rounded-md hover:bg-gray-50 hover:text-gray-900 transition-colors">
                    Time Off
                  </Link>
                </>
              )}
            </nav>
          </div>

          <div className="flex items-center space-x-4">
            {}
            <div className="relative flex items-center">
              <button 
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center space-x-2 p-1.5 rounded-full hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-200 transition-colors"
              >
                <div className="relative">
                  <UserCircleIcon className="h-8 w-8 text-gray-400" />
                  {}
                  <div className={`absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full ring-2 ring-white ${isCheckedIn ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                </div>
                <span className="text-sm font-medium text-gray-700 hidden sm:block pr-1">{user.name}</span>
                <ChevronDownIcon className="h-4 w-4 text-gray-400 hidden sm:block" />
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50 overflow-hidden">
                  <div className="py-1">
                    <button 
                      onClick={() => signOut()}
                      className="w-full text-left block px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      Log out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {}
      <div className="bg-gray-50/80 backdrop-blur-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex items-center justify-between">
          <div className="text-sm font-medium text-gray-600 flex items-center gap-2">
            <span className={`inline-block w-2 h-2 rounded-full ${isCheckedIn ? 'bg-green-500' : 'bg-gray-300'}`}></span>
            {isCheckedIn ? "Checked in" : "Checked out"}
          </div>
          <div className="flex space-x-3">
            <button 
              onClick={handleCheckIn}
              className={`px-3 py-1.5 text-sm font-medium rounded-md shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-gray-900 ${isCheckedIn || isPending ? 'bg-gray-100 text-gray-400 border border-gray-200 cursor-not-allowed shadow-none' : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 hover:text-gray-900'}`}
              disabled={isCheckedIn || isPending}
            >
              Check in
            </button>
            <button 
              onClick={handleCheckOut}
              className={`px-3 py-1.5 text-sm font-medium rounded-md shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-blue-600 ${!isCheckedIn || isPending ? 'bg-gray-100 text-gray-400 border border-gray-200 cursor-not-allowed shadow-none' : 'bg-blue-600 text-white hover:bg-blue-700 border border-transparent'}`}
              disabled={!isCheckedIn || isPending}
            >
              Check out
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
