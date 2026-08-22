"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

export default function AttendanceDateFilter({ defaultDate }: { defaultDate: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentDate = searchParams.get("date") || defaultDate;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDate = e.target.value;
    if (newDate) {
      router.push(`/attendance/admin?date=${newDate}`);
    } else {
      router.push(`/attendance/admin`);
    }
  };

  return (
    <div className="relative w-full sm:w-72">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
      </div>
      <input 
        type="date" 
        value={currentDate}
        onChange={handleChange}
        className="block w-full pl-10 pr-3 py-2 border border-gray-300 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent" 
      />
    </div>
  );
}
