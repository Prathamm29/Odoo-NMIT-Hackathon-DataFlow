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
    <header className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            {/* Logo Placeholder */}
            <div className="flex-shrink-0 flex items-center">
              <span className="text-xl font-bold tracking-tight text-gray-900">DAYFLOW</span>
            </div>
            
            {/* Navigation Links */}
            <nav className="ml-8 flex space-x-8 items-center">
              <Link href="/dashboard" className="text-gray-900 px-3 py-2 text-sm font-medium hover:bg-gray-100">
                Directory
              </Link>
              {user.role === "ADMIN" ? (
                <>
                  <Link href="/attendance/admin" className="text-gray-600 px-3 py-2 text-sm font-medium hover:bg-gray-100">
                    Attendance Admin
                  </Link>
                  <Link href="/time-off/admin" className="text-gray-600 px-3 py-2 text-sm font-medium hover:bg-gray-100">
                    Time Off Admin
                  </Link>
                </>
              ) : (
                <>
                  <Link href="/attendance/employee" className="text-gray-600 px-3 py-2 text-sm font-medium hover:bg-gray-100">
                    Attendance
                  </Link>
                  <Link href="/time-off/employee" className="text-gray-600 px-3 py-2 text-sm font-medium hover:bg-gray-100">
                    Time Off
                  </Link>
                </>
              )}
            </nav>
          </div>

          <div className="flex items-center space-x-6">
            {/* User Profile Systray */}
            <div className="relative">
              <button 
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center space-x-2 p-2 focus:outline-none hover:bg-gray-100"
              >
                <div className="relative">
                  <UserCircleIcon className="h-8 w-8 text-gray-600" />
                  {/* Status Indicator */}
                  <div className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white ${isCheckedIn ? 'bg-green-500' : 'bg-yellow-500'}`}></div>
                </div>
                <span className="text-sm font-medium text-gray-700">{user.name}</span>
                <ChevronDownIcon className="h-4 w-4 text-gray-500" />
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-1 w-48 bg-white border border-gray-200 z-10 shadow-lg">
                  <div className="py-1">
                    <button 
                      onClick={() => signOut()}
                      className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Log Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Quick Check-in Sub-bar */}
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
          <div className="text-sm text-gray-600">
            {isCheckedIn ? "You are currently checked in." : "You are currently checked out."}
          </div>
          <div className="space-x-4 flex">
            <button 
              onClick={handleCheckIn}
              className={`px-4 py-2 text-sm font-bold border border-gray-300 ${isCheckedIn || isPending ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-white text-gray-900 hover:bg-gray-100'}`}
              disabled={isCheckedIn || isPending}
            >
              Check In &rarr;
            </button>
            <button 
              onClick={handleCheckOut}
              className={`px-4 py-2 text-sm font-bold border border-gray-300 ${!isCheckedIn || isPending ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-white text-gray-900 hover:bg-gray-100'}`}
              disabled={!isCheckedIn || isPending}
            >
              Check Out &rarr;
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
