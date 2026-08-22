import { CalendarDaysIcon } from "@heroicons/react/24/outline";
import { getMyAttendance } from "@/actions/attendance.actions";

export default async function EmployeeAttendancePage() {
  const result = await getMyAttendance();
  const records = result.success && result.data ? result.data : [];

  // Format date helper
  const formatDate = (isoString: string) => {
    return new Date(isoString).toLocaleDateString("en-US", {
      year: "numeric", month: "short", day: "numeric"
    });
  };

  const formatTime = (isoString: string | null) => {
    if (!isoString) return "-";
    return new Date(isoString).toLocaleTimeString("en-US", {
      hour: "2-digit", minute: "2-digit"
    });
  };

  const currentMonth = new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Attendance</h1>
          <p className="text-gray-600 mt-1">Review your recent check-in and check-out logs.</p>
        </div>
        
        <div className="flex items-center space-x-2 bg-white border border-gray-300 px-4 py-2">
          <CalendarDaysIcon className="w-5 h-5 text-gray-500" />
          <span className="text-sm font-medium text-gray-900">{currentMonth}</span>
        </div>
      </div>

      {!result.success && (
        <div className="p-4 bg-red-50 border border-red-200 text-red-700 text-sm">
          {result.error}
        </div>
      )}

      <div className="bg-white border border-gray-300 overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-900 uppercase tracking-wider">Date</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-900 uppercase tracking-wider">Status</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-900 uppercase tracking-wider">Check In</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-900 uppercase tracking-wider">Check Out</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-900 uppercase tracking-wider">Work Hours</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-900 uppercase tracking-wider">Extra Hours</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {records.map((row) => (
              <tr key={row.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">{formatDate(row.date)}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                  <span className={`px-2 py-1 text-xs font-bold ${
                    row.status === 'PRESENT' ? 'bg-green-100 text-green-800' :
                    row.status === 'ABSENT' ? 'bg-red-100 text-red-800' :
                    row.status === 'LEAVE' ? 'bg-blue-100 text-blue-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {row.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{formatTime(row.checkIn)}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{formatTime(row.checkOut)}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900">{row.workHours ? `${row.workHours}h` : '-'}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-green-700 font-medium">{row.extraHours ? `${row.extraHours}h` : '-'}</td>
              </tr>
            ))}
            
            {records.length === 0 && (
              <tr>
                <td colSpan={6} className="px-6 py-12 text-center text-sm text-gray-500">
                  No attendance records found for this month.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
