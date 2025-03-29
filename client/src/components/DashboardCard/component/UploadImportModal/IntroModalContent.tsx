import { GithubIcon } from '@/components/SVG';
import { StoreModel } from '@/redux/model';
import { IntroModalContentInterface } from '@/types/interface';
import { Button } from '@nextui-org/react';
import { useStoreState } from 'easy-peasy';
import { usePathname } from 'next/navigation';
import { IoMdCloudUpload } from 'react-icons/io';

export default function IntroModalContent({
  setCurrentTab,
}: IntroModalContentInterface) {
  const pathname = usePathname();
  const githubAuth = useStoreState<StoreModel>(
    (state) => state?.githubAuthModel.githubModel
  );

  const initiateGitHubLogin = () => {
    sessionStorage.setItem('redirect_after_login', pathname);
    window.location.href =
      process.env.NEXT_PUBLIC_API_BASE_URL + `/github/auth`;
  };

  return (
    <>
      <p className="text-lg font-semibold text-black">
        Import or Export Project
      </p>

      {githubAuth.token && githubAuth.username ? (
        <Button
          className="flex w-52 items-center justify-start space-x-2 rounded-xl bg-black p-1.5 pl-2 font-semibold text-white"
          title="Github options"
          onClick={() => setCurrentTab('github')}
        >
          <GithubIcon classes="ml-2 size-7" />
          Github Options
        </Button>
      ) : (
        <Button
          onClick={initiateGitHubLogin}
          className="flex w-52 items-center justify-start rounded-xl bg-black p-1.5 pl-2 font-semibold text-white"
          title="Connect to GitHub"
        >
          <GithubIcon classes="ml-2 size-7" />
          Connect to GitHub
        </Button>
      )}

      <Button
        onClick={() => setCurrentTab('local-import')}
        className="flex w-52 items-center justify-start rounded-xl bg-black p-1.5 pl-2 font-semibold text-white"
        title="Upload local project"
      >
        <IoMdCloudUpload className="ml-2 size-7" />
        Import from your PC
      </Button>
    </>
  );
}
