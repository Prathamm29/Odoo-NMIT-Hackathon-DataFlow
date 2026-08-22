import { getAllAttendance } from "@/actions/attendance.actions";
import AttendanceDateFilter from "@/components/attendance/AttendanceDateFilter";
import Link from "next/link";

export default async function AdminAttendancePage({
  searchParams,
}: {
  searchParams: { date?: string };
}) {
  const todayStr = new Date().toISOString().split('T')[0];
  const targetDate = searchParams.date || todayStr;
  
  const result = await getAllAttendance(targetDate);
  const records = result.success && result.data ? result.data : [];

  
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

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Attendance Log</h1>
          <p className="text-gray-600 mt-1">Monitor company-wide employee attendance records.</p>
        </div>
        
        <AttendanceDateFilter defaultDate={todayStr} />
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
              <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-900 uppercase tracking-wider">Employee Name</th>
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
                <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">
                  <Link href={`/profile/${row.userId}`} className="hover:underline text-blue-600">
                    {row.employeeName}
                  </Link>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{formatDate(row.date)}</td>
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
                <td colSpan={7} className="px-6 py-12 text-center text-sm text-gray-500">
                  No attendance records found for this date.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
