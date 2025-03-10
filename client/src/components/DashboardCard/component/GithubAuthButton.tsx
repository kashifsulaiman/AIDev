'use client';

import { CheckMarkIcon, GithubIcon } from '@/components/SVG';
import { useSession, signIn, signOut } from 'next-auth/react';
import { useEffect } from 'react';

export default function GitHubAuthButton() {
    const { data: session } = useSession();

    useEffect(() => {
        session && console.log("Github Auth Successful", session);
    }, [session]);

    return (
        <div className="flex items-center">
            {session ? (
                <button
                    onClick={() => signOut()}
                    className="flex items-center space-x-2 bg-gray-800 text-white rounded-xl p-1.5 relative "
                >
                    <GithubIcon classes="size-7" />
                    <div className='bg-green-900 rounded-full p-1 absolute -top-1.5 -right-1.5 z-10 size-[1.2em] flex items-center justify-center'>
                        <CheckMarkIcon classes="text-white w-full h-full" />
                    </div>
                </button>
            ) : (
                <button
                    onClick={() => signIn('github')}
                    className="bg-gray-800 text-white rounded-full p-1.5"
                    title="Connect to GitHub"
                >
                    <GithubIcon classes='size-7' />
                </button>
            )}
        </div>
    );
}
