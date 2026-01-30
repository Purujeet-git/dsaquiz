"use client";

import { signIn } from "next-auth/react";

export default function SignupPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-sm">
        <h1 className="text-2xl font-bold mb-6 text-center">
          Create your account
        </h1>

        <button
          onClick={() => signIn("github", { callbackUrl: "/topics" })}
          className="w-full bg-black text-white py-3 rounded-lg font-medium hover:opacity-90"
        >
          Sign up with GitHub
        </button>

        <p className="text-xs text-gray-500 text-center mt-4">
          Uses GitHub OAuth for authentication
        </p>
      </div>
    </div>
  );
}
