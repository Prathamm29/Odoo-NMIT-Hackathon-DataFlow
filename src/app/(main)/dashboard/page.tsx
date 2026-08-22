import { getEmployees, getEmployeeProfile } from "@/actions/employee.actions";
import { getCurrentSession } from "@/actions/auth.actions";
import AdminDashboard from "@/components/dashboard/AdminDashboard";
import EmployeeDashboard from "@/components/dashboard/EmployeeDashboard";
import { notFound } from "next/navigation";

export default async function DashboardPage() {
  const session = await getCurrentSession();
  
  if (!session) {
    return null; // Handled by layout redirect
  }

  if (session.role === "ADMIN") {
    const result = await getEmployees();
    const employees = result.success && result.data ? result.data : [];
    return <AdminDashboard employees={employees} />;
  } else {
    const result = await getEmployeeProfile(session.userId);
    if (!result.success || !result.data) {
      return notFound();
    }
    return <EmployeeDashboard employee={result.data} />;
  }
}
