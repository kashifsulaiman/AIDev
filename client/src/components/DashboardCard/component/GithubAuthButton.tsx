'use client';

import { DropdownCheckIcon, GithubIcon } from '@/components/SVG';
import { showToaster } from '@/components/Toaster';
import { GITHUB_TOKEN_REGEX } from '@/constants/regex';
import { StoreModel } from '@/redux/model';
import { useStoreActions, useStoreState } from 'easy-peasy';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

export default function GitHubAuthButton() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const token = searchParams.get('token');
  const username = searchParams.get('username');
  const router = useRouter();
  const githubAuth = useStoreState<StoreModel>(
    (state) => state?.githubAuthModel.githubModel
  );
  const setGithubAuth = useStoreActions<StoreModel>(
    (actions) => actions?.githubAuthModel.setGithubModel
  );
  const promptData = useStoreState<StoreModel>(
    (state) => state?.promptModel?.prompt
  );

  useEffect(() => {
    if (!token || !username || !isValidGitHubToken(token)) return;
    showToaster('GitHub auth successful', 'success');
    setGithubAuth({ token, username });
    router.push(pathname);
  }, [token, username]);

  const initiateGitHubLogin = () => {
    window.location.href =
      process.env.NEXT_PUBLIC_API_BASE_URL + '/auth/github';
  };

  function isValidGitHubToken(token: string) {
    return GITHUB_TOKEN_REGEX.some((pattern) => pattern.test(token));
  }

  const signOut = () => {
    setGithubAuth({ token: null, username: null });
  };
  if (!promptData.loader) {
    return;
  }

  return (
    <div className="flex items-center">
      {githubAuth.token && githubAuth.username ? (
        <button
          onClick={signOut}
          className="relative flex items-center space-x-2 rounded-xl bg-gray-800 p-1.5 text-white"
        >
          <GithubIcon classes="size-7" />
          <div className="absolute -right-1.5 -top-1.5 z-10 flex size-[1.2em] items-center justify-center rounded-full bg-green-900 p-1">
            <DropdownCheckIcon classes="text-white w-full h-full" />
          </div>
        </button>
      ) : (
        <button
          onClick={initiateGitHubLogin}
          className="rounded-xl bg-gray-800 p-1.5 text-white"
          title="Connect to GitHub"
        >
          <GithubIcon classes="size-7" />
        </button>
      )}
    </div>
  );
}
