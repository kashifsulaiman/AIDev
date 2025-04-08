"use client";

import { ApiUrl } from "@/constants/apiUrl";
import { GoogleIcon } from "../SVG";

export default function GoogleLoginButton() {
  const handleLogin = () => {
    window.location.href = `${process.env.NEXT_PUBLIC_API_BASE_URL}/${ApiUrl.GOOGLE_LOGIN}`;
  };

  return (
    <button
      onClick={handleLogin}
      className="w-full h-6 sm:h-12  px-5 py-4 md:py-2 rounded-full flex items-center justify-center gap-3 border border-gray-300 bg-white hover:shadow-md transition duration-200"
    >
      <GoogleIcon classes="text-xl" />
      <span className="text-sm text-black font-medium">Google</span>
    </button>
  );
}
