"use client";

import { CheckIcon, XMarkIcon } from "@heroicons/react/24/solid";

const MOCK_REQUESTS = [
  { id: 1, name: "Alice Johnson", type: "Paid Time Off", from: "2023-11-01", to: "2023-11-05", days: 5, status: "Pending" },
  { id: 2, name: "Bob Smith", type: "Sick Leave", from: "2023-10-26", to: "2023-10-27", days: 2, status: "Pending" },
  { id: 3, name: "Charlie Davis", type: "Unpaid Leave", from: "2023-12-20", to: "2023-12-31", days: 12, status: "Pending" },
  { id: 4, name: "Diana Prince", type: "Paid Time Off", from: "2023-10-15", to: "2023-10-16", days: 2, status: "Approved" },
];

export default function AdminTimeOffPage() {
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
            {MOCK_REQUESTS.map((req) => (
              <tr key={req.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">{req.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{req.type}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{req.from}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{req.to}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900">{req.days}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <span className={`px-2 py-1 text-xs font-bold uppercase ${req.status === 'Approved' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                    {req.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                  {req.status === 'Pending' && (
                    <>
                      <button className="inline-flex items-center px-3 py-1 bg-green-500 text-white font-bold text-xs hover:bg-green-600 focus:outline-none">
                        <CheckIcon className="w-3 h-3 mr-1" /> Approve
                      </button>
                      <button className="inline-flex items-center px-3 py-1 bg-red-500 text-white font-bold text-xs hover:bg-red-600 focus:outline-none">
                        <XMarkIcon className="w-3 h-3 mr-1" /> Reject
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
