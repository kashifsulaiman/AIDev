'use client';

import { DropdownCheckIcon, GithubIcon } from '@/components/SVG';
import { showToaster } from '@/components/Toaster';
import { GITHUB_TOKEN_REGEX } from '@/constants/regex';
import { StoreModel } from '@/redux/model';
import { useStoreActions, useStoreState } from 'easy-peasy';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import GithubAuthModal from './GithubModal';
import { useDisclosure } from '@nextui-org/react';

interface GithubAuthButtonInterface {
  classes?: string;
}

export default function GitHubAuthButton({
  classes = '',
}: GithubAuthButtonInterface) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const token = searchParams.get('token');
  const username = searchParams.get('username');
  const router = useRouter();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
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
    if (!token || !username || !isValidGitHubToken(token) || githubAuth.token)
      return;
    showToaster('GitHub auth successful', 'success');
    setGithubAuth({ token, username });
    const redirectAfterLogin = sessionStorage.getItem('redirect_after_login');
    if (redirectAfterLogin) router.push(redirectAfterLogin);
  }, [token, username]);

  const initiateGitHubLogin = () => {
    sessionStorage.setItem('redirect_after_login', pathname);
    window.location.href =
      process.env.NEXT_PUBLIC_API_BASE_URL + `/github/auth`;
  };

  function isValidGitHubToken(token: string) {
    return GITHUB_TOKEN_REGEX.some((pattern) => pattern.test(token));
  }

  if (promptData.loader) {
    return;
  }

  return (
    <div className="flex items-center">
      <div className={classes}>
        {githubAuth.token && githubAuth.username ? (
          <button
            onClick={onOpen}
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

      <GithubAuthModal isModalOpen={isOpen} modalCloseHandler={onOpenChange} />
    </div>
  );
}
