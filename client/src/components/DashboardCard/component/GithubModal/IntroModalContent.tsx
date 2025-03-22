import { Button } from '@nextui-org/react';
import { StoreModel } from '@/redux/model';
import { useStoreActions, useStoreState } from 'easy-peasy';
import { DisconnectIcon, DownloadIcon, UploadIcon } from '@/components/SVG';
import { useState } from 'react';
import Loader from '@/Loader/loading';
import { IntroModalContentInterface } from '@/types/interface';
import { useGithubMutation } from '@/hooks/useGithubMutation';
import { usePathname } from 'next/navigation';

export default function IntroModalContent({
  modalCloseHandler,
  setRepos,
  setCurrentTab,
}: IntroModalContentInterface) {
  const pathname = usePathname();
  const githubAuth = useStoreState<StoreModel>(
    (state) => state?.githubAuthModel.githubModel
  );
  const setGithubAuth = useStoreActions<StoreModel>(
    (actions) => actions?.githubAuthModel.setGithubModel
  );
  const signOut = () => {
    setGithubAuth({ token: null, username: null });
    modalCloseHandler();
  };
  const [loader, setLoader] = useState<boolean>(false);

  const { mutate: getGithubRepos } = useGithubMutation<
    void,
    { full_name: string }[]
  >({
    url: '/user/repos',
    method: 'GET',
    token: githubAuth.token,
    onSuccess: (data) => {
      const reposData = data.map((repo) => ({ label: repo.full_name }));
      setRepos(reposData);
      setLoader(false);
      setCurrentTab('import');
    },
  });

  const handleGetGithubRepos = () => {
    setLoader(true);
    getGithubRepos();
  };

  return (
    <>
      {pathname.includes('main') && (
        <Button
          className="relative mt-2 flex w-[16rem] items-center justify-start gap-2 bg-black text-white max-sm:w-full"
          onClick={handleGetGithubRepos}
        >
          {loader ? (
            <span className="mx-auto">
              <Loader Color="white" height="24px" />
            </span>
          ) : (
            <>
              <DownloadIcon classes="size-5" />
              <span className="py-1 font-semibold">
                Import Project from GitHub
              </span>
            </>
          )}
        </Button>
      )}

      {pathname.includes('overview') && (
        <Button className="relative mt-2 flex w-[16rem] items-center justify-start gap-2 bg-black text-white">
          <UploadIcon classes="size-5" />
          <span className="py-1 font-semibold">Export Project to GitHub</span>
        </Button>
      )}

      <Button
        className="absolute bottom-2 right-2 mt-2 flex w-fit items-center gap-2 bg-[#FF2c2c] px-3 text-white"
        onClick={signOut}
      >
        <DisconnectIcon classes="size-5" />
        <span className="py-0 text-sm font-medium">Disconnect</span>
      </Button>
    </>
  );
}
