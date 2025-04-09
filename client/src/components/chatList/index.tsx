import { ApiUrl } from '@/constants/apiUrl';
import { useEffect } from 'react';
import { useQuery } from '@/hooks/useQuery';
import { useStoreActions, useStoreState } from 'easy-peasy';
import Link from 'next/link';
import Loader from '@/Loader/loading';
import { Listbox, ListboxItem } from '@nextui-org/react';
import { StoreModel } from '@/redux/model';
import { DeleteChatButton } from '../DashboardCard/component/DeleteChatButton';
import { ShareLinkButton } from '../DashboardCard/component/ShareLinkButton';

const ChatList = () => {
  const user = useStoreState<StoreModel>((state) => state?.userObj?.UserObj);
  const prompt = useStoreState<StoreModel>(
    (state) => state?.promptModel?.prompt
  );
  const conversation = useStoreState<StoreModel>(
    (state) => state?.conversationModel?.conversation
  );
  const setChatList = useStoreActions<StoreModel>(
    (state) => state?.conversationModel?.setChatList
  );
  const { data, isLoading, refetch } = useQuery({
    queryKey: ['chatlist', user._id],
    url: `${ApiUrl.GET_CHAT_LIST}/${user._id}`,
    showToast: true,
  });

  useEffect(() => {
    if (data && !isLoading) {
      setChatList(data);
    }
  }, [data, isLoading]);

  useEffect(() => {
    refetch();
  }, [prompt.content, prompt.code, conversation.conversationId, user._id]);

  if (isLoading) {
    return (
      <div className="mt-10 flex size-full h-full items-center justify-center">
        <div className="size-20">
          <Loader Color="#961CBE" height="50px" width="50px" />
        </div>
      </div>
    );
  }
  return (
    <div className="h-full w-full overflow-y-auto [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-200 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar]:w-1">
      {conversation.chatList.length > 0 && (
        <Listbox
          aria-labelledby="listbox-label"
          id="sidebar-list"
          className="Scroller-Class lg:overflow-y-[initial] flex flex-col items-center justify-center gap-1 px-2 lg:max-h-[initial]"
        >
          {conversation.chatList.map((chat: any, index: number) => (
            <ListboxItem
              key={`menu-${chat._id}-${index}`}
              className="text-[#64748B] hover:!bg-purple-white-gradient hover:!text-white"
              classNames={{
                base: 'rounded-[99px] p-2 w-auto',
                title: 'flex items-center justify-between',
              }}
              textValue={chat.title}
            >
              <Link
                href={`${process.env.NEXT_PUBLIC_SITE_URL}/overview/${chat._id}`}
                className="flex-1 px-3 py-1"
              >
                <span className="block w-36 overflow-hidden text-ellipsis whitespace-nowrap font-Jakarta text-sm font-medium">
                  {chat.title}
                </span>
              </Link>
              <DeleteChatButton chatId={chat._id} />
              <ShareLinkButton
                chatId={chat._id}
                buttonClassName="h-5 min-w-fit rounded-none bg-transparent !pl-0 !pr-2 text-inherit "
                iconClassName="w-4 h-4 text-inherit hover:!text-gray-400 "
              />
            </ListboxItem>
          ))}
        </Listbox>
      )}
    </div>
  );
};

export default ChatList;
