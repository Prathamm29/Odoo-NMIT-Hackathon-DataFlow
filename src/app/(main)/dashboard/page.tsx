import Link from "next/link";
import { PaperAirplaneIcon, UserIcon } from "@heroicons/react/24/solid";
import { getEmployees } from "@/actions/employee.actions";

export default async function DashboardPage() {
  const result = await getEmployees();
  const employees = result.success && result.data ? result.data : [];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Employees Directory</h1>
        <p className="text-gray-600 mt-1">View and manage all company employees.</p>
        {!result.success && (
          <p className="text-red-600 mt-2 text-sm">{result.error}</p>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {employees.map((employee) => (
          <Link key={employee.id} href={`/profile/${employee.id}`} className="block">
            <div className="bg-white border border-gray-300 p-6 flex flex-col items-center text-center hover:bg-gray-50 cursor-pointer h-full">
              <div className="relative mb-4">
                <div className="w-20 h-20 bg-gray-200 border border-gray-300 flex items-center justify-center">
                  <UserIcon className="w-10 h-10 text-gray-400" />
                </div>
              </div>
              
              <h3 className="text-lg font-bold text-gray-900 mb-1">
                {employee.firstName} {employee.lastName}
              </h3>
              <p className="text-sm font-medium text-gray-700">{employee.jobTitle || 'Employee'}</p>
              <p className="text-xs text-gray-500 mt-2 uppercase tracking-wide">{employee.department || 'N/A'}</p>
            </div>
          </Link>
        ))}

        {employees.length === 0 && result.success && (
          <div className="col-span-full py-12 text-center text-gray-500 border-2 border-dashed border-gray-300">
            No employees found in your company.
          </div>
        )}
      </div>
    </div>
  );
}
