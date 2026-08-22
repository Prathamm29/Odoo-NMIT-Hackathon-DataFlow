"use client";

import { useState } from "react";
import { PlusIcon, XMarkIcon, PaperClipIcon } from "@heroicons/react/24/outline";

export default function EmployeeTimeOffPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Time Off</h1>
          <p className="text-gray-600 mt-1">Manage your leaves and check balances.</p>
        </div>
        
        <button 
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center px-4 py-2 bg-gray-900 text-white font-bold text-sm hover:bg-gray-800 focus:outline-none"
        >
          <PlusIcon className="w-5 h-5 mr-2" /> Request Time Off
        </button>
      </div>

      {/* Summary Header */}
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

      {/* Visual Calendar Placeholder */}
      <div className="bg-white border border-gray-300 p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4 border-b border-gray-200 pb-2">Schedule</h3>
        <div className="aspect-[2/1] w-full bg-gray-50 border-2 border-dashed border-gray-300 flex items-center justify-center text-gray-400">
          <p>Interactive Calendar Component Placeholder</p>
        </div>
      </div>

      {/* Request Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white w-full max-w-lg border border-gray-300 p-6 shadow-none">
            <div className="flex justify-between items-center mb-6 border-b border-gray-200 pb-4">
              <h2 className="text-xl font-bold text-gray-900">New Time-Off Request</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-500 hover:text-gray-900">
                <XMarkIcon className="w-6 h-6" />
              </button>
            </div>

            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-1">Employee Name</label>
                <input type="text" readOnly value="Jane Doe" className="w-full border border-gray-300 bg-gray-50 px-3 py-2 text-sm text-gray-900" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-1">Time-off Type</label>
                <select className="w-full border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900">
                  <option>Paid Time Off</option>
                  <option>Sick Leave</option>
                  <option>Unpaid Leave</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-1">From</label>
                  <input type="date" className="w-full border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-1">To</label>
                  <input type="date" className="w-full border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-1">Allocation Days</label>
                <input type="number" placeholder="e.g. 2" className="w-full border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-1">Attachment</label>
                <div className="flex items-center justify-center w-full">
                  <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed cursor-pointer bg-gray-50 hover:bg-gray-100">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <PaperClipIcon className="w-8 h-8 mb-3 text-gray-400" />
                      <p className="mb-2 text-sm text-gray-500"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                    </div>
                    <input type="file" className="hidden" />
                  </label>
                </div>
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
                  onClick={(e) => { e.preventDefault(); setIsModalOpen(false); }}
                  className="px-4 py-2 bg-gray-900 text-white font-bold text-sm hover:bg-gray-800"
                >
                  Submit Request
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
