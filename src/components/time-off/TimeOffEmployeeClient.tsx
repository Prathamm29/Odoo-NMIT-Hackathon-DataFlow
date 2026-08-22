"use client";

import { useState } from "react";
import { PlusIcon, XMarkIcon, PaperClipIcon } from "@heroicons/react/24/outline";
import { requestLeave } from "@/actions/leave.actions";
import { useRouter } from "next/navigation";
import type { LeaveRequestDTO } from "@/lib/types";

export default function TimeOffEmployeeClient({ 
  leaves, 
  employeeName 
}: { 
  leaves: LeaveRequestDTO[];
  employeeName: string;
}) {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const result = await requestLeave(formData);

    if (result.success) {
      setIsModalOpen(false);
      router.refresh();
    } else {
      setError(result.error || "An error occurred");
    }
    setIsLoading(false);
  };

  const formatDate = (isoString: string) => {
    return new Date(isoString).toLocaleDateString("en-US", {
      year: "numeric", month: "short", day: "numeric"
    });
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Time Off</h1>
          <p className="text-gray-600 mt-1">Manage your leaves and check balances.</p>
        </div>
        
        <button 
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white font-bold text-sm hover:bg-blue-600 focus:outline-none"
        >
          <PlusIcon className="w-5 h-5 mr-2" /> Request Time Off
        </button>
      </div>

      {}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white border border-gray-300 p-6 flex flex-col items-center justify-center text-center">
          <span className="text-sm font-bold text-gray-500 uppercase tracking-wide">Paid Time Off</span>
          <span className="text-4xl font-mono font-bold text-gray-900 mt-2">14</span>
          <span className="text-xs text-gray-400 mt-1">Days Available</span>
        </div>
        <div className="bg-white border border-gray-300 p-6 flex flex-col items-center justify-center text-center">
          <span className="text-sm font-bold text-gray-500 uppercase tracking-wide">Sick Leave</span>
          <span className="text-4xl font-mono font-bold text-gray-900 mt-2">5</span>
          <span className="text-xs text-gray-400 mt-1">Days Available</span>
        </div>
        <div className="bg-white border border-gray-300 p-6 flex flex-col items-center justify-center text-center">
          <span className="text-sm font-bold text-gray-500 uppercase tracking-wide">Unpaid Leave</span>
          <span className="text-4xl font-mono font-bold text-gray-900 mt-2">Unlimited</span>
          <span className="text-xs text-gray-400 mt-1">Subject to Approval</span>
        </div>
      </div>

      {}
      <div className="bg-white border border-gray-300 overflow-x-auto">
        <h3 className="text-lg font-bold text-gray-900 m-6 mb-2 border-b border-gray-200 pb-2">Leave History</h3>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-900 uppercase tracking-wider">Type</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-900 uppercase tracking-wider">Dates</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-900 uppercase tracking-wider">Days</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-900 uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {leaves.map((leave) => (
              <tr key={leave.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">{leave.leaveType}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{formatDate(leave.startDate)} - {formatDate(leave.endDate)}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900">{leave.allocationDays}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <span className={`px-2 py-1 text-xs font-bold ${
                    leave.status === 'APPROVED' ? 'bg-green-100 text-green-800' :
                    leave.status === 'REJECTED' ? 'bg-red-100 text-red-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {leave.status}
                  </span>
                </td>
              </tr>
            ))}
            {leaves.length === 0 && (
              <tr>
                <td colSpan={4} className="px-6 py-12 text-center text-sm text-gray-500">
                  No leave requests found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-500/20 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white w-full max-w-lg border border-gray-300 p-6 shadow-none">
            <div className="flex justify-between items-center mb-6 border-b border-gray-200 pb-4">
              <h2 className="text-xl font-bold text-gray-900">New Time-Off Request</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-500 hover:text-gray-900">
                <XMarkIcon className="w-6 h-6" />
              </button>
            </div>

            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-1">Employee Name</label>
                <input type="text" readOnly value={employeeName} className="w-full border border-gray-300 bg-gray-50 px-3 py-2 text-sm text-gray-900" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-1">Time-off Type</label>
                <select name="leaveType" required className="w-full border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-600">
                  <option value="PAID">Paid Time Off</option>
                  <option value="SICK">Sick Leave</option>
                  <option value="UNPAID">Unpaid Leave</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-1">From</label>
                  <input type="date" name="startDate" required className="w-full border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-600" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-1">To</label>
                  <input type="date" name="endDate" required className="w-full border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-600" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-1">Allocation Days</label>
                <input type="number" name="allocationDays" step="0.5" required placeholder="e.g. 2" className="w-full border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-600" />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-1">Remarks</label>
                <input type="text" name="remarks" placeholder="Optional notes..." className="w-full border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-600" />
              </div>

              <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200 mt-6">
                <button 
                  type="button" 
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border border-gray-300 bg-white text-gray-900 font-bold text-sm hover:bg-gray-100"
                >
                  Discard
                </button>
                <button 
                  type="submit" 
                  disabled={isLoading}
                  className="px-4 py-2 bg-blue-600 text-white font-bold text-sm hover:bg-blue-600 disabled:opacity-70"
                >
                  {isLoading ? "Submitting..." : "Submit Request"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
