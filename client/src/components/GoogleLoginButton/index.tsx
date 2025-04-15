'use client';

import { ApiUrl } from '@/constants/apiUrl';
import { GoogleIcon } from '../SVG';

export default function GoogleLoginButton() {
  const handleLogin = () => {
    window.location.href = `${process.env.NEXT_PUBLIC_API_BASE_URL}/${ApiUrl.GOOGLE_LOGIN}`;
  };

  return (
    <button
      onClick={handleLogin}
      className="flex h-6 w-full items-center justify-center gap-3 rounded-full border border-gray-300 bg-white px-5 py-4 transition duration-200 hover:shadow-md sm:h-12 md:py-2"
    >
      <GoogleIcon classes="text-xl" />
      <span className="text-sm font-medium text-black">Google</span>
    </button>
  );
}
