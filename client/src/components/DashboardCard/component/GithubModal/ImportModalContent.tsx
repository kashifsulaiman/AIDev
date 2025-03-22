import { StoreModel } from '@/redux/model';
import { useStoreActions, useStoreState } from 'easy-peasy';
import { useEffect, useState } from 'react';
import { fetchAllFiles, fetchSelectedFiles } from '@/utils/github';
import Dropdown from '@/components/Dropdown';
import FileManagerSection from './FileManagerSection';
import Loader from '@/Loader/loading';
import { useMutation } from '@/hooks/useMutation';
import { POST } from '@/hooks/consts';
import { ApiUrl } from '@/constants/apiUrl';
import { useRouter } from 'next/navigation';
import { ProjectFiles } from '@stackblitz/sdk';
import { ImportModalContentInterface } from '@/types/interface';
import { SelectedRepoType, RepoItemsType } from '@/types/modalTypes';

export default function ImportModalContent({
  repos,
  modalCloseHandler,
}: ImportModalContentInterface) {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedRepo, setSelectedRepo] = useState<SelectedRepoType>({
    label: 'Select repository to import',
  });
  const [repoItems, setRepoItems] = useState<RepoItemsType[] | null>(null);
  const [selectedItems, setSelectedItems] = useState<RepoItemsType[] | null>(
    null
  );
  const githubAuth = useStoreState<StoreModel>(
    (state) => state?.githubAuthModel.githubModel
  );
  const user = useStoreState<StoreModel>((state) => state?.userObj?.UserObj);
  const setPrompt = useStoreActions<StoreModel>(
    (actions) => actions?.promptModel?.setPrompt
  );
  const { setConversation } = useStoreActions<StoreModel>(
    (actions) => actions.conversationModel
  );
  const currentModel = useStoreState<StoreModel>(
    (state) => state.aiModel.model
  );

  const handleRepoSelection = (item: SelectedRepoType) => {
    setSelectedRepo(item);
    getRepoContents(item.label);
  };

  const getRepoContents = async (repoName: string) => {
    setLoading(true);
    try {
      const contents = await fetchAllFiles(repoName, githubAuth.token);
      setRepoItems(contents);
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  const startConversation = async (code: ProjectFiles) => {
    if (!selectedRepo) {
      return;
    }
    const mutationInput = {
      humanPrompt: `Import ${selectedRepo.label} project from Github and provide a summary`,
      code: code,
      userId: user.id,
      model: {
        provider: currentModel.provider,
        reasoning: currentModel.reasoning,
        aiModel: currentModel.model,
      },
    };
    mutateConversation(mutationInput);
  };

  const getRepoData = async () => {
    if (!selectedItems) {
      return;
    }
    setLoading(true);
    try {
      const filesOnly =
        selectedItems && selectedItems.filter((item) => item.type !== 'folder');
      const data = await fetchSelectedFiles(
        selectedRepo.label,
        githubAuth.token,
        filesOnly
      );
      startConversation(data);
    } catch (e) {
      console.log(e);
    }
  };

  const { mutate: mutateConversation } = useMutation({
    isToaster: false,
    method: POST,
    url: ApiUrl.IMPORT_PROJECT,
    onSuccess: (res) => {
      const { conversationId, messages, title } = res?.data;
      const lastMessage = messages[messages.length - 1];
      const newPrompt = {
        code: lastMessage.code,
        content: lastMessage.userPrompt,
        loader: false,
      };
      const newConversation = {
        _id: conversationId,
        userId: user.id,
        messages,
        title,
        refinementRequired: false,
      };
      setPrompt(newPrompt);
      setConversation(newConversation);
      router.push(`/overview/${conversationId}`);
      setLoading(false);
      modalCloseHandler();
    },
  });

  useEffect(() => {
    getRepoData();
  }, [selectedItems]);

  return (
    <>
      {repos ? (
        <>
          {repos.length && (
            <Dropdown
              items={repos}
              selectedItem={selectedRepo}
              onSelect={handleRepoSelection}
            />
          )}
        </>
      ) : (
        <span>No Repositories found</span>
      )}

      {loading ? (
        <Loader Color="black" width="100%" />
      ) : (
        repoItems && (
          <FileManagerSection
            selectedRepo={selectedRepo}
            repoItems={repoItems}
            selectedItems={selectedItems}
            setSelectedItems={setSelectedItems}
          />
        )
      )}
    </>
  );
}
