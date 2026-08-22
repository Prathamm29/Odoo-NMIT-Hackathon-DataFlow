import TopBar from "@/components/layout/TopBar";
import Footer from "@/components/layout/Footer";
import { getCurrentSession } from "@/actions/auth.actions";
import { getEmployeeProfile } from "@/actions/employee.actions";
import { getTodayStatus } from "@/actions/attendance.actions";
import { redirect } from "next/navigation";

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getCurrentSession();
  
  if (!session) {
    redirect("/sign-in");
  }

  const [profileResult, statusResult] = await Promise.all([
    getEmployeeProfile(session.userId),
    getTodayStatus()
  ]);

  const profile = profileResult.success && profileResult.data ? profileResult.data : null;
  const todayStatus = statusResult.success && statusResult.data ? statusResult.data : { isCheckedIn: false, checkInTime: null, checkOutTime: null, attendanceId: null };

  return (
    <div className="min-h-screen flex flex-col">
      <TopBar 
        initialStatus={todayStatus} 
        user={{
          name: profile ? `${profile.firstName} ${profile.lastName}` : "User",
          role: session.role
        }} 
      />
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
      <Footer />
    </div>
  );
}
