import Link from "next/link";
import { PaperAirplaneIcon, UserIcon } from "@heroicons/react/24/solid";

const MOCK_EMPLOYEES = [
  { id: "1", name: "Alice Johnson", role: "Software Engineer", department: "Engineering", status: "Present", avatar: "" },
  { id: "2", name: "Bob Smith", role: "Product Manager", department: "Product", status: "Absent", avatar: "" },
  { id: "3", name: "Charlie Davis", role: "UX Designer", department: "Design", status: "On Leave", avatar: "" },
  { id: "4", name: "Diana Prince", role: "QA Engineer", department: "Engineering", status: "Present", avatar: "" },
  { id: "5", name: "Ethan Hunt", role: "DevOps Engineer", department: "Operations", status: "Present", avatar: "" },
  { id: "6", name: "Fiona Gallagher", role: "HR Manager", department: "Human Resources", status: "Absent", avatar: "" },
  { id: "7", name: "George Costanza", role: "Sales Executive", department: "Sales", status: "Present", avatar: "" },
  { id: "8", name: "Hannah Abbott", role: "Marketing Specialist", department: "Marketing", status: "On Leave", avatar: "" },
];

export default function DashboardPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Employees Directory</h1>
        <p className="text-gray-600 mt-1">View and manage all company employees.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {MOCK_EMPLOYEES.map((employee) => (
          <Link key={employee.id} href={`/profile/${employee.id}`} className="block">
            <div className="bg-white border border-gray-300 p-6 flex flex-col items-center text-center hover:bg-gray-50 cursor-pointer h-full">
              <div className="relative mb-4">
                <div className="w-20 h-20 bg-gray-200 border border-gray-300 flex items-center justify-center">
                  <UserIcon className="w-10 h-10 text-gray-400" />
                </div>
                {/* Status Indicator */}
                <div className="absolute -bottom-2 -right-2 bg-white p-1 border border-gray-300">
                  {employee.status === "Present" && <div className="w-4 h-4 bg-green-500" title="Present" />}
                  {employee.status === "Absent" && <div className="w-4 h-4 bg-yellow-500" title="Absent" />}
                  {employee.status === "On Leave" && <PaperAirplaneIcon className="w-4 h-4 text-blue-500" title="On Leave" />}
                </div>
              </div>
              
              <h3 className="text-lg font-bold text-gray-900 mb-1">{employee.name}</h3>
              <p className="text-sm font-medium text-gray-700">{employee.role}</p>
              <p className="text-xs text-gray-500 mt-2 uppercase tracking-wide">{employee.department}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
