"use client";

import { CalendarDaysIcon } from "@heroicons/react/24/outline";

const MOCK_MY_ATTENDANCE = [
  { id: 1, date: "2023-10-25", checkIn: "08:55 AM", checkOut: "05:05 PM", workHours: "8h 10m", extraHours: "10m" },
  { id: 2, date: "2023-10-24", checkIn: "09:00 AM", checkOut: "05:00 PM", workHours: "8h 0m", extraHours: "0m" },
  { id: 3, date: "2023-10-23", checkIn: "08:50 AM", checkOut: "05:30 PM", workHours: "8h 40m", extraHours: "40m" },
  { id: 4, date: "2023-10-20", checkIn: "08:58 AM", checkOut: "05:02 PM", workHours: "8h 4m", extraHours: "4m" },
  { id: 5, date: "2023-10-19", checkIn: "09:10 AM", checkOut: "06:10 PM", workHours: "9h 0m", extraHours: "1h 0m" },
];

export default function EmployeeAttendancePage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Attendance</h1>
          <p className="text-gray-600 mt-1">Review your recent check-in and check-out logs.</p>
        </div>
        
        <div className="flex items-center space-x-2 bg-white border border-gray-300 px-4 py-2">
          <CalendarDaysIcon className="w-5 h-5 text-gray-500" />
          <span className="text-sm font-medium text-gray-900">October 2023</span>
        </div>
      </div>

      <div className="bg-white border border-gray-300 overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-900 uppercase tracking-wider">Date</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-900 uppercase tracking-wider">Check In</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-900 uppercase tracking-wider">Check Out</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-900 uppercase tracking-wider">Work Hours</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-900 uppercase tracking-wider">Extra Hours</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {MOCK_MY_ATTENDANCE.map((row) => (
              <tr key={row.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">{row.date}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{row.checkIn}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{row.checkOut}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900">{row.workHours}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-green-700 font-medium">{row.extraHours}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
