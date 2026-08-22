import { getAllLeaveRequests } from "@/actions/leave.actions";
import TimeOffAdminClient from "@/components/time-off/TimeOffAdminClient";

export default async function AdminTimeOffPage() {
  const result = await getAllLeaveRequests();
  const requests = result.success && result.data ? result.data : [];

  return <TimeOffAdminClient requests={requests} />;
}
