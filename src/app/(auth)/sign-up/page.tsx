"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { PhotoIcon } from "@heroicons/react/24/outline";

export default function SignUpPage() {
  const router = useRouter();

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/dashboard");
  };

  return (
    <div className="w-full max-w-2xl bg-white border border-gray-300 p-8">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900">DAYFLOW</h1>
        <p className="text-gray-600 mt-2">Register your company</p>
      </div>

      <form onSubmit={handleSignUp} className="space-y-6">
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2 flex items-end space-x-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Company Name
              </label>
              <input 
                type="text" 
                required 
                className="w-full border border-gray-300 px-4 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2 invisible">
                Upload Logo
              </label>
              <button 
                type="button" 
                className="flex items-center justify-center border border-gray-300 px-4 py-2 bg-gray-50 text-gray-700 hover:bg-gray-100 h-[42px]"
              >
                <PhotoIcon className="w-5 h-5 mr-2" />
                <span>Upload Logo</span>
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Full Name
            </label>
            <input 
              type="text" 
              required 
              className="w-full border border-gray-300 px-4 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent" 
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Email
            </label>
            <input 
              type="email" 
              required 
              className="w-full border border-gray-300 px-4 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent" 
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Phone
            </label>
            <input 
              type="tel" 
              required 
              className="w-full border border-gray-300 px-4 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent" 
            />
          </div>
          
          <div className="md:col-span-2"><hr className="border-gray-200" /></div>

          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Password
            </label>
            <input 
              type="password" 
              required 
              className="w-full border border-gray-300 px-4 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent" 
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Confirm Password
            </label>
            <input 
              type="password" 
              required 
              className="w-full border border-gray-300 px-4 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent" 
            />
          </div>
        </div>

        <button 
          type="submit" 
          className="w-full bg-gray-900 text-white font-bold py-3 hover:bg-gray-800"
        >
          Sign Up
        </button>
      </form>

      <div className="mt-6 text-center">
        <Link href="/sign-in" className="text-sm font-medium text-gray-900 hover:underline">
          Already have an account? Sign In
        </Link>
      </div>
    </div>
  );
}
