"use client";

import { useTransition } from "react";
import { CheckIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { updateLeaveStatus } from "@/actions/leave.actions";
import { useRouter } from "next/navigation";
import type { LeaveRequestDTO } from "@/lib/types";

export default function TimeOffAdminClient({ 
  requests 
}: { 
  requests: LeaveRequestDTO[] 
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleStatusUpdate = (requestId: string, status: "APPROVED" | "REJECTED") => {
    startTransition(async () => {
      const result = await updateLeaveStatus(requestId, status);
      if (result.success) {
        router.refresh();
      } else {
        alert(result.error || "Failed to update leave status");
      }
    });
  };

  const formatDate = (isoString: string) => {
    return new Date(isoString).toLocaleDateString("en-US", {
      year: "numeric", month: "short", day: "numeric"
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Time-Off Requests</h1>
          <p className="text-gray-600 mt-1">Review and manage employee leave applications.</p>
        </div>
      </div>

      <div className="bg-white border border-gray-300 overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-900 uppercase tracking-wider">Employee Name</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-900 uppercase tracking-wider">Leave Type</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-900 uppercase tracking-wider">From</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-900 uppercase tracking-wider">To</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-900 uppercase tracking-wider">Days</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-900 uppercase tracking-wider">Status</th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-bold text-gray-900 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {requests.map((req) => (
              <tr key={req.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">{req.employeeName || "Unknown"}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{req.leaveType}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{formatDate(req.startDate)}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{formatDate(req.endDate)}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900">{req.allocationDays}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <span className={`px-2 py-1 text-xs font-bold uppercase ${
                    req.status === 'APPROVED' ? 'bg-green-100 text-green-800' :
                    req.status === 'REJECTED' ? 'bg-red-100 text-red-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {req.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                  {req.status === 'PENDING' && (
                    <>
                      <button 
                        onClick={() => handleStatusUpdate(req.id, 'APPROVED')}
                        disabled={isPending}
                        className="inline-flex items-center px-3 py-1 bg-green-600 text-white font-bold text-xs hover:bg-green-700 focus:outline-none disabled:opacity-50"
                      >
                        <CheckIcon className="w-3 h-3 mr-1" /> Approve
                      </button>
                      <button 
                        onClick={() => handleStatusUpdate(req.id, 'REJECTED')}
                        disabled={isPending}
                        className="inline-flex items-center px-3 py-1 bg-red-600 text-white font-bold text-xs hover:bg-red-700 focus:outline-none disabled:opacity-50"
                      >
                        <XMarkIcon className="w-3 h-3 mr-1" /> Reject
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
            {requests.length === 0 && (
              <tr>
                <td colSpan={7} className="px-6 py-12 text-center text-sm text-gray-500">
                  No time-off requests found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
