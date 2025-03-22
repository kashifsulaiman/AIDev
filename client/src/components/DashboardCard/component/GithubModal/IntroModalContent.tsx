import { Button } from '@nextui-org/react';
import { StoreModel } from '@/redux/model';
import { useStoreActions, useStoreState } from 'easy-peasy';
import { DisconnectIcon, DownloadIcon, UploadIcon } from '@/components/SVG';
import { useState } from 'react';
import Loader from '@/Loader/loading';
import { IntroModalContentInterface } from '@/types/interface';
import { useGithubMutation } from '@/hooks/useGithubMutation';
import { usePathname } from 'next/navigation';

export default function IntroModalContent({ modalCloseHandler, setRepos, setCurrentTab }: IntroModalContentInterface) {

    const pathname = usePathname()
    const githubAuth = useStoreState<StoreModel>(
        (state) => state?.githubAuthModel.githubModel
    );
    const setGithubAuth = useStoreActions<StoreModel>(
        (actions) => actions?.githubAuthModel.setGithubModel
    );
    const signOut = () => {
        setGithubAuth({ token: null, username: null });
        modalCloseHandler()
    };
    const [loader, setLoader] = useState<boolean>(false)

    const { mutate: getGithubRepos } = useGithubMutation<void, { full_name: string }[]>({
        url: "/user/repos",
        method: "GET",
        token: githubAuth.token,
        onSuccess: (data) => {
            const reposData = data.map((repo) => ({ label: repo.full_name }))
            setRepos(reposData);
            setLoader(false);
            setCurrentTab("import");
        },
    });

    const handleGetGithubRepos = () => {
        setLoader(true)
        getGithubRepos()
    }

    return (
        <>
            {pathname.includes('main')
                && <Button
                    className="bg-black text-white mt-2 relative w-[16rem] max-sm:w-full flex items-center justify-start gap-2"
                    onClick={handleGetGithubRepos}
                >{loader ?
                    <span className='mx-auto'>
                        <Loader Color='white' height='24px' />
                    </span> :
                    <>
                        <DownloadIcon classes='size-5' />
                        <span className=' py-1 font-semibold'>
                            Import Project from GitHub
                        </span>
                    </>}
                </Button>}

            {pathname.includes('overview')
                && <Button
                    className="bg-black text-white mt-2 relative w-[16rem] flex items-center justify-start gap-2"
                >
                    <UploadIcon classes='size-5' />
                    <span className=' py-1 font-semibold'>
                        Export Project to GitHub
                    </span>
                </Button>}

            <Button
                className="text-white bg-[#FF2c2c] w-fit mt-2 absolute right-2 bottom-2 px-3 flex items-center gap-2"
                onClick={signOut} >
                <DisconnectIcon classes='size-5' />
                <span className='py-0 text-sm font-medium'>
                    Disconnect
                </span>
            </Button>
        </>
    );
};
