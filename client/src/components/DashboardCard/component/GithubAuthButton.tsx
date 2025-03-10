'use client';

import { DropdownCheckIcon, GithubIcon } from '@/components/SVG';
import { useSession, signIn, signOut } from 'next-auth/react';

export default function GitHubAuthButton() {
  const { data: session } = useSession();

  return (
    <div className="flex items-center">
      {session ? (
        <button
          onClick={() => signOut()}
          className="relative flex items-center space-x-2 rounded-xl bg-gray-800 p-1.5 text-white"
        >
          <GithubIcon classes="size-7" />
          <div className="absolute -right-1.5 -top-1.5 z-10 flex size-[1.2em] items-center justify-center rounded-full bg-green-900 p-1">
            <DropdownCheckIcon classes="text-white w-full h-full" />
          </div>
        </button>
      ) : (
        <button
          onClick={() => signIn('github')}
          className="rounded-xl bg-gray-800 p-1.5 text-white"
          title="Connect to GitHub"
        >
          <GithubIcon classes="size-7" />
        </button>
      )}
    </div>
  );
}
