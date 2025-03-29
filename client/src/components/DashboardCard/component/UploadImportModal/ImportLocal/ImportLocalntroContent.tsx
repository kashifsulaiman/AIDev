import Loader from '@/Loader/loading';
import { RepoItemsType } from '@/types/modalTypes';
import {
  getFolderContents,
  transformFilesToObject,
} from '@/utils/local-import';
import { Button } from '@nextui-org/react';
import { useEffect, useState } from 'react';
import { StoreModel } from '@/redux/model';
import { useStoreState, useStoreActions } from 'easy-peasy';
import { POST } from '@/hooks/consts';
import { useMutation } from '@/hooks/useMutation';
import { ApiUrl } from '@/constants/apiUrl';
import { useRouter } from 'next/navigation';
import { ImportLocalIntroContentInterface } from '@/types/interface';
import { FolderIcon } from '@/components/SVG';
import { showToaster } from '@/components/Toaster';
import FileManagerSection from '../../FileManager';

export default function ImportLocalIntroContent({
  handleCloseModal,
}: ImportLocalIntroContentInterface) {
  const router = useRouter();
  const [folderData, setFolderData] = useState<RepoItemsType[] | null>(null);
  const [selectedFolderData, setSelectedFolderData] = useState<
    RepoItemsType[] | null
  >(null);
  const [selectedFolderName, setSelectedFolderName] = useState<string | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(false);

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

  const handleSelectFolder = async () => {
    setLoading(true);
    const result = await getFolderContents();
    if (result) {
      const { folderName, files } = result;
      setFolderData(files);
      setSelectedFolderName(folderName);
    }
    setLoading(false);
  };

  const startConversation = async () => {
    if (!selectedFolderData) return;
    setLoading(true);
    const transformedCode = transformFilesToObject(selectedFolderData);
    const mutationInput = {
      humanPrompt: `Import ${selectedFolderName} project from my PC and provide a summary`,
      code: transformedCode,
      userId: user.id,
      model: {
        provider: currentModel.provider,
        reasoning: currentModel.reasoning,
        aiModel: currentModel.model,
      },
    };
    mutateConversation(mutationInput);
  };

  const { mutate: mutateConversation } = useMutation({
    isToaster: false,
    method: POST,
    url: ApiUrl.IMPORT_PROJECT,
    onSuccess: (res) => {
      const { conversationId, messages, title, githubRepoName } = res?.data;
      const lastMessage = messages[messages.length - 1];
      const newPrompt = {
        code: lastMessage.code,
        content: lastMessage.userPrompt,
        loader: false,
      };
      const newConversation = {
        _id: conversationId,
        userId: user.id,
        githubRepoName: githubRepoName,
        messages,
        title,
        refinementRequired: false,
      };
      showToaster('Project imported frpm your PC', 'success');
      setPrompt(newPrompt);
      setConversation(newConversation);
      router.push(`/overview/${conversationId}`);
      modalCloseHandler();
      setLoading(false);
    },
  });

  const modalCloseHandler = () => {
    setSelectedFolderName(null);
    setSelectedFolderData(null);
    handleCloseModal();
  };

  useEffect(() => {
    if (!selectedFolderData && !selectedFolderName) return;
    startConversation();
  }, [selectedFolderData]);

  const fmCondition = selectedFolderName && folderData;

  return (
    <>
      <p className="max-w-80 text-lg font-semibold">
        Select folder to upload from your PC
      </p>

      <Button
        className="relative flex items-center justify-start gap-2 bg-black px-4 py-2 text-white"
        onClick={handleSelectFolder}
      >
        <FolderIcon classes="size-5" />
        {selectedFolderName ? (
          <span className="py-1 font-semibold">{selectedFolderName}</span>
        ) : (
          <span className="py-1 font-semibold">Select Folder</span>
        )}
      </Button>

      {loading ? (
        <Loader Color="black" width="100%" />
      ) : (
        fmCondition && (
          <FileManagerSection
            folderItems={folderData}
            selectedRepo={{ label: selectedFolderName }}
            selectedItems={selectedFolderData}
            setSelectedItems={setSelectedFolderData}
          />
        )
      )}
    </>
  );
}
