"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { PhotoIcon } from "@heroicons/react/24/outline";
import { signUp } from "@/actions/auth.actions";

export default function SignUpPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const result = await signUp(formData);

    if (!result.success) {
      setError(result.error);
      setIsLoading(false);
    } else {
      // The server action handles redirect to dashboard
      router.push("/dashboard");
    }
  };

  return (
    <div className="w-full max-w-2xl bg-white border border-gray-300 p-8">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900">DAYFLOW</h1>
        <p className="text-gray-600 mt-2">Register your company</p>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSignUp} className="space-y-6">
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2 flex items-end space-x-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Company Name
              </label>
              <input 
                type="text" 
                name="companyName"
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
              name="fullName"
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
              name="email"
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
              name="phone"
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
              name="password"
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
              name="confirmPassword"
              required 
              className="w-full border border-gray-300 px-4 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent" 
            />
          </div>
        </div>

        <button 
          type="submit" 
          disabled={isLoading}
          className="w-full bg-gray-900 text-white font-bold py-3 hover:bg-gray-800 disabled:opacity-70"
        >
          {isLoading ? "Signing up..." : "Sign Up"}
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
