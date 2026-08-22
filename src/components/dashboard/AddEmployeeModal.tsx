"use client";

import { useState } from "react";
import { addEmployee } from "@/actions/employee.actions";
import { useRouter } from "next/navigation";

export default function AddEmployeeModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successData, setSuccessData] = useState<{ loginId: string; temporaryPassword: string } | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const result = await addEmployee(formData);

    if (!result.success) {
      setError(result.error || "Failed to create employee.");
      setIsLoading(false);
    } else {
      setSuccessData(result.data!);
      setIsLoading(false);
      router.refresh();
    }
  };

  const closeModal = () => {
    setIsOpen(false);
    setSuccessData(null);
    setError(null);
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="bg-gray-900 text-white px-4 py-2 text-sm font-bold hover:bg-gray-800"
      >
        + Add Employee
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white w-full max-w-md p-6 border border-gray-300 shadow-xl">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900">Add New Employee</h2>
              <button onClick={closeModal} className="text-gray-500 hover:text-gray-900 text-2xl font-bold leading-none">&times;</button>
            </div>

            {successData ? (
              <div className="space-y-4">
                <div className="p-4 bg-green-50 border border-green-200">
                  <h3 className="text-green-800 font-bold mb-2">Employee created successfully!</h3>
                  <p className="text-sm text-green-700 mb-4">Please save these credentials and share them with the employee. They will be forced to change this password on their first login.</p>
                  <div className="bg-white p-3 border border-green-100 font-mono text-sm space-y-2">
                    <div><span className="text-gray-500">Login ID:</span> <span className="font-bold text-gray-900">{successData.loginId}</span></div>
                    <div><span className="text-gray-500">Password:</span> <span className="font-bold text-gray-900">{successData.temporaryPassword}</span></div>
                  </div>
                </div>
                <button 
                  onClick={closeModal}
                  className="w-full bg-gray-900 text-white font-bold py-2 hover:bg-gray-800"
                >
                  Close
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                  <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-sm">
                    {error}
                  </div>
                )}
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-1">First Name *</label>
                    <input type="text" name="firstName" required className="w-full border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-gray-900" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-1">Last Name *</label>
                    <input type="text" name="lastName" required className="w-full border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-gray-900" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-1">Email *</label>
                  <input type="email" name="email" required className="w-full border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-gray-900" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-1">Job Title</label>
                    <input type="text" name="jobTitle" className="w-full border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-gray-900" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-1">Department</label>
                    <input type="text" name="department" className="w-full border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-gray-900" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-1">Base Monthly Wage</label>
                  <input type="number" name="baseMonthlyWage" min="0" step="0.01" className="w-full border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-gray-900" />
                </div>

                <div className="pt-4 flex justify-end space-x-3">
                  <button 
                    type="button" 
                    onClick={closeModal}
                    className="px-4 py-2 border border-gray-300 text-sm font-bold text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    disabled={isLoading}
                    className="px-4 py-2 bg-gray-900 text-white text-sm font-bold hover:bg-gray-800 disabled:opacity-70"
                  >
                    {isLoading ? "Creating..." : "Create Employee"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}
