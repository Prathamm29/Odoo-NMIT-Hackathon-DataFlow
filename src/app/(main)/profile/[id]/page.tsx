import { getEmployeeProfile } from "@/actions/employee.actions";
import { UserIcon } from "@heroicons/react/24/solid";
import ProfileTabs from "@/components/profile/ProfileTabs";
import { notFound } from "next/navigation";

export default async function ProfilePage({ params }: { params: { id: string } }) {
  const result = await getEmployeeProfile(params.id);

  if (!result.success || !result.data) {
    return notFound();
  }

  const profile = result.data;

  return (
    <div className="space-y-6">
      {/* Header Profile Card */}
      <div className="bg-white border border-gray-300 p-6 flex flex-col md:flex-row gap-8">
        <div className="flex-shrink-0">
          <div className="w-32 h-32 bg-gray-200 border border-gray-300 flex items-center justify-center">
            <UserIcon className="w-16 h-16 text-gray-400" />
          </div>
        </div>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{profile.firstName} {profile.lastName}</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-4 gap-x-8 text-sm">
            <div>
              <span className="block text-gray-500 font-medium">Login ID / Email</span>
              <span className="block text-gray-900">{profile.email}</span>
            </div>
            <div>
              <span className="block text-gray-500 font-medium">Role</span>
              <span className="block text-gray-900">{profile.role}</span>
            </div>
            <div>
              <span className="block text-gray-500 font-medium">Company</span>
              <span className="block text-gray-900">{profile.companyName}</span>
            </div>
            <div>
              <span className="block text-gray-500 font-medium">Department</span>
              <span className="block text-gray-900">{profile.department || "N/A"}</span>
            </div>
            <div>
              <span className="block text-gray-500 font-medium">Job Title</span>
              <span className="block text-gray-900">{profile.jobTitle || "N/A"}</span>
            </div>
            <div>
              <span className="block text-gray-500 font-medium">Date of Joining</span>
              <span className="block text-gray-900">{new Date(profile.dateOfJoining).toLocaleDateString()}</span>
            </div>
          </div>
        </div>
      </div>

      <ProfileTabs profile={profile} />
    </div>
  );
}
