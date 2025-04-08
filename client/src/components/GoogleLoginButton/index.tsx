"use client";

import { GoogleIcon } from "../SVG";

export default function GoogleLoginButton() {
  const handleLogin = () => {
    window.location.href = "http://localhost:5000/auth/google";
  };

  return (
    <button
      onClick={handleLogin}
      className="w-full flex items-center justify-center gap-3 border border-gray-300 rounded-lg px-5 py-2 bg-white hover:shadow-md transition duration-200"
    >
      <GoogleIcon classes="text-xl" />
      <span className="text-sm text-black font-medium">Google</span>
    </button>
  );
}
