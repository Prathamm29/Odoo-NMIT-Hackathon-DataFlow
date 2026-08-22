"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function SignInPage() {
  const router = useRouter();
  const [needsReset, setNeedsReset] = useState(false);
  const [password, setPassword] = useState("password123");

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "system-generated") {
      setNeedsReset(true);
    } else {
      router.push("/dashboard");
    }
  };

  const handleResetPassword = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/dashboard");
  };

  if (needsReset) {
    return (
      <div className="w-full max-w-md bg-white border border-gray-300 p-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">DAYFLOW</h1>
          <p className="text-gray-600 mt-2">Set your new password</p>
        </div>
  
        <form onSubmit={handleResetPassword} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Current Password
            </label>
            <input 
              type="password" 
              readOnly
              value={password}
              className="w-full border border-gray-300 bg-gray-50 px-4 py-2 text-gray-500 focus:outline-none" 
            />
          </div>
  
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              New Password
            </label>
            <input 
              type="password" 
              required 
              className="w-full border border-gray-300 px-4 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent" 
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Confirm New Password
            </label>
            <input 
              type="password" 
              required 
              className="w-full border border-gray-300 px-4 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent" 
            />
          </div>
  
          <button 
            type="submit" 
            className="w-full bg-gray-900 text-white font-bold py-3 hover:bg-gray-800"
          >
            Set Password &amp; Continue
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md bg-white border border-gray-300 p-8">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900">DAYFLOW</h1>
        <p className="text-gray-600 mt-2">Sign in to your account</p>
      </div>

      <form onSubmit={handleSignIn} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">
            Login ID / Email
          </label>
          <input 
            type="text" 
            required 
            defaultValue="janedoe@example.com"
            className="w-full border border-gray-300 px-4 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent" 
          />
        </div>

        <div>
          <div className="flex justify-between mb-2">
            <label className="block text-sm font-medium text-gray-900">
              Password
            </label>
            <span className="text-xs text-gray-500">(Type "system-generated" to demo reset)</span>
          </div>
          <input 
            type="password" 
            required 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-300 px-4 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent" 
          />
        </div>

        <button 
          type="submit" 
          className="w-full bg-gray-900 text-white font-bold py-3 hover:bg-gray-800"
        >
          Sign In
        </button>
      </form>

      <div className="mt-6 text-center">
        <Link href="/sign-up" className="text-sm font-medium text-gray-900 hover:underline">
          Don't have an Account? Sign Up
        </Link>
      </div>
    </div>
  );
}
