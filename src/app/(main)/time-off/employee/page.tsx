import { getMyLeaves } from "@/actions/leave.actions";
import { getCurrentSession } from "@/actions/auth.actions";
import { getEmployeeProfile } from "@/actions/employee.actions";
import TimeOffEmployeeClient from "@/components/time-off/TimeOffEmployeeClient";
import { redirect } from "next/navigation";

export default async function EmployeeTimeOffPage() {
  const session = await getCurrentSession();
  if (!session) {
    redirect("/sign-in");
  }

  const [leavesResult, profileResult] = await Promise.all([
    getMyLeaves(),
    getEmployeeProfile(session.userId)
  ]);

  const leaves = leavesResult.success && leavesResult.data ? leavesResult.data : [];
  const profile = profileResult.success && profileResult.data ? profileResult.data : null;
  const employeeName = profile ? `${profile.firstName} ${profile.lastName}` : "Employee";

  return (
    <TimeOffEmployeeClient leaves={leaves} employeeName={employeeName} />
  );
}
