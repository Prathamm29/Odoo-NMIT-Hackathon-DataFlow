"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn, changePassword } from "@/actions/auth.actions";

export default function SignInPage() {
  const router = useRouter();
  const [needsReset, setNeedsReset] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const result = await signIn(formData);

    if (!result.success) {
      setError(result.error);
      setIsLoading(false);
      return;
    }

    if (result.data?.mustChangePassword && result.data.userId) {
      setUserId(result.data.userId);
      setNeedsReset(true);
      setIsLoading(false);
    } else {
      // The server action already redirects, but if it doesn't:
      router.push("/dashboard");
    }
  };

  const handleResetPassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    if (userId) {
      formData.append("userId", userId);
    }
    
    const result = await changePassword(formData);

    if (!result.success) {
      setError(result.error);
      setIsLoading(false);
    } else {
      router.push("/dashboard");
    }
  };

  if (needsReset) {
    return (
      <div className="w-full max-w-md bg-white border border-gray-300 p-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">DAYFLOW</h1>
          <p className="text-gray-600 mt-2">Set your new password</p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleResetPassword} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              New Password
            </label>
            <input 
              type="password" 
              name="newPassword"
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
              name="confirmNewPassword"
              required 
              className="w-full border border-gray-300 px-4 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent" 
            />
          </div>
  
          <button 
            type="submit" 
            disabled={isLoading}
            className="w-full bg-gray-900 text-white font-bold py-3 hover:bg-gray-800 disabled:opacity-70"
          >
            {isLoading ? "Updating..." : "Set Password & Continue"}
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

      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSignIn} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">
            Login ID / Email
          </label>
          <input 
            type="text" 
            name="identifier"
            required 
            placeholder="admin@dayflow.com"
            className="w-full border border-gray-300 px-4 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent" 
          />
        </div>

        <div>
          <div className="flex justify-between mb-2">
            <label className="block text-sm font-medium text-gray-900">
              Password
            </label>
          </div>
          <input 
            type="password" 
            name="password"
            required 
            placeholder="••••••••"
            className="w-full border border-gray-300 px-4 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent" 
          />
        </div>

        <button 
          type="submit" 
          disabled={isLoading}
          className="w-full bg-gray-900 text-white font-bold py-3 hover:bg-gray-800 disabled:opacity-70"
        >
          {isLoading ? "Signing in..." : "Sign In"}
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
