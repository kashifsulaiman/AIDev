import { showToaster } from '@/components/Toaster';
import { ApiUrl } from '@/constants/apiUrl';
import { GITHUB_REPONAME_REGEX } from '@/constants/regex';
import { PUT } from '@/hooks/consts';
import { useMutation } from '@/hooks/useMutation';
import Loader from '@/Loader/loading';
import { StoreModel } from '@/redux/model';
import { GithubExportModalContentInterface } from '@/types/interface';
import { createRepoAndUpload, updateRepoFiles } from '@/utils/github';
import { Button, Input } from '@nextui-org/react';
import { useStoreActions, useStoreState } from 'easy-peasy';
import { useState } from 'react';
import UsernameSection from './UsernameSection';

export default function GithubExportModalContent({
  modalCloseHandler,
}: GithubExportModalContentInterface) {
  const conversation = useStoreState<StoreModel>(
    (state) => state?.conversationModel?.conversation
  );
  const githubAuth = useStoreState<StoreModel>(
    (state) => state?.githubAuthModel.githubModel
  );
  const { code } = useStoreState<StoreModel>(
    (state) => state?.promptModel?.prompt
  );
  const { setGithubRepoName } = useStoreActions<StoreModel>(
    (actions) => actions.conversationModel
  );

  const [newRepoName, setNewRepoName] = useState<string>('');
  const [loader, setLoader] = useState(false);

  const handleUpdateExistingRepo = async () => {
    try {
      setLoader(true);
      await updateRepoFiles(
        conversation.githubRepoName,
        githubAuth.token,
        code.files
      );
      showToaster('Updated code to Repo Successfully', 'success');
      setLoader(false);
      modalCloseHandler();
    } catch (error) {
      console.log(error);
    }
  };

  const handleCreateNewRepo = async () => {
    if (!newRepoName.trim() || !GITHUB_REPONAME_REGEX.test(newRepoName)) {
      showToaster('Repo Name cannot contain special characters');
      return;
    }
    try {
      setLoader(true);
      await createRepoAndUpload(
        githubAuth.username,
        newRepoName,
        githubAuth.token,
        code
      );
      mutate({
        conversationId: conversation.conversationId,
        updateObj: {
          githubRepoName: `${githubAuth.username}/${newRepoName}`,
        },
      });
      showToaster('Repo created successfully', 'success');
      modalCloseHandler();
      setLoader(false);
    } catch (error) {
      console.log(error);
    }
  };

  const { mutate } = useMutation({
    isToaster: false,
    method: PUT,
    url: ApiUrl.UPDATE_CONVERSATION,
    onSuccess: (res) => {
      if (!res?.data.success) {
        showToaster('Error updating database', 'error');
      }
      setGithubRepoName(`${githubAuth.username}/${newRepoName}`);
      setNewRepoName('');
    },
  });

  if (loader) {
    return (
      <div className="flex w-full flex-col items-center gap-2 text-center">
        <UsernameSection />
        <Loader Color="black" width="100%" />
      </div>
    );
  }

  if (conversation?.githubRepoName) {
    return (
      <div className="flex w-full flex-col items-center gap-2 text-center">
        <UsernameSection />
        <p>Repo already exists on GitHub</p>
        <p className="max-w-80">
          Would you like to push to GitHub to
          <br />
          <span className="font-bold">{conversation.githubRepoName}</span> ?
        </p>
        <Button
          className="relative mt-2 flex items-center justify-center gap-2 bg-black px-4 text-white max-sm:w-full"
          onClick={handleUpdateExistingRepo}
        >
          Push to Github
        </Button>
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col items-center gap-2 text-center">
      <UsernameSection />
      <p>No repo found</p>
      <p className="max-w-80">Would you like to create a new Github repo ?</p>
      <Input
        isRequired
        label="Repo Name"
        value={newRepoName}
        onChange={(e) => setNewRepoName(e.target.value)}
        placeholder="Enter new Repo name"
        type="text"
      />
      <Button
        className="relative mt-2 flex items-center justify-center gap-2 bg-black px-4 text-white max-sm:w-full"
        onClick={handleCreateNewRepo}
      >
        Create new Repo
      </Button>
    </div>
  );
}
