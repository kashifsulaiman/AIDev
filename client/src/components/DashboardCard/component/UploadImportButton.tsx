'use client';

import { Tooltip, Button } from '@nextui-org/react';
import { useEffect, useState } from 'react';
import UploadImportModal from './UploadImportModal';
import { StoreModel } from '@/redux/model';
import { useStoreActions, useStoreState } from 'easy-peasy';
import { useRouter, useSearchParams } from 'next/navigation';
import { showToaster } from '@/components/Toaster';
import { GITHUB_TOKEN_REGEX } from '@/constants/regex';
import { CloudUploadIcon } from '@/components/SVG';

export default function UploadImportProjectButton() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const username = searchParams.get('username');
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const githubAuth = useStoreState<StoreModel>(
    (state) => state?.githubAuthModel.githubModel
  );
  const setGithubAuth = useStoreActions<StoreModel>(
    (actions) => actions?.githubAuthModel.setGithubModel
  );

  useEffect(() => {
    if (!token || !username || !isValidGitHubToken(token) || githubAuth.token)
      return;
    showToaster('GitHub auth successful', 'success');
    setGithubAuth({ token, username });
    const redirectAfterLogin = sessionStorage.getItem('redirect_after_login');
    if (redirectAfterLogin) router.push(redirectAfterLogin);
  }, [token, username]);

  const handleCloseModal = () => {
    setIsOpen(!isOpen);
  };

  function isValidGitHubToken(token: string) {
    return GITHUB_TOKEN_REGEX.some((pattern) => pattern.test(token));
  }

  return (
    <div className="relative flex items-center">
      <Tooltip content="Upload/Import project">
        <Button
          onClick={handleCloseModal}
          className="!min-w-fit rounded-xl bg-gray-800 px-2 py-1.5 text-white"
        >
          <CloudUploadIcon classes="size-7 pr-0.5" />
        </Button>
      </Tooltip>

      <UploadImportModal isOpen={isOpen} handleCloseModal={handleCloseModal} />
    </div>
  );
}
