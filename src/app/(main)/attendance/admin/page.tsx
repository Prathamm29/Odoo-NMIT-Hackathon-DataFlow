"use client";

import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

const MOCK_DATA = [
  { id: 1, name: "Alice Johnson", date: "2023-10-25", checkIn: "08:55 AM", checkOut: "05:05 PM", workHours: "8h 10m", extraHours: "10m" },
  { id: 2, name: "Bob Smith", date: "2023-10-25", checkIn: "09:15 AM", checkOut: "06:30 PM", workHours: "9h 15m", extraHours: "1h 15m" },
  { id: 3, name: "Charlie Davis", date: "2023-10-25", checkIn: "08:45 AM", checkOut: "04:45 PM", workHours: "8h 0m", extraHours: "0m" },
  { id: 4, name: "Diana Prince", date: "2023-10-25", checkIn: "09:00 AM", checkOut: "05:15 PM", workHours: "8h 15m", extraHours: "15m" },
  { id: 5, name: "Alice Johnson", date: "2023-10-24", checkIn: "08:50 AM", checkOut: "05:00 PM", workHours: "8h 10m", extraHours: "10m" },
];

export default function AdminAttendancePage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Attendance Log</h1>
          <p className="text-gray-600 mt-1">Monitor company-wide employee attendance records.</p>
        </div>
        
        <div className="relative w-full sm:w-72">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
          </div>
          <input 
            type="date" 
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent" 
            defaultValue="2023-10-25"
          />
        </div>
      </div>

      <div className="bg-white border border-gray-300 overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-900 uppercase tracking-wider">Employee Name</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-900 uppercase tracking-wider">Date</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-900 uppercase tracking-wider">Check In</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-900 uppercase tracking-wider">Check Out</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-900 uppercase tracking-wider">Work Hours</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-900 uppercase tracking-wider">Extra Hours</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {MOCK_DATA.map((row) => (
              <tr key={row.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">{row.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{row.date}</td>
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
