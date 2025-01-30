import { ApiUrl } from '@/constants/apiUrl';
import { useEffect, useState } from 'react';
import { useQuery } from '@/hooks/useQuery';
import { useStoreState } from 'easy-peasy';
import Link from 'next/link';
import Loader from '@/Loader/loading';
import { Listbox, ListboxItem } from '@nextui-org/react';

interface ChatList {
  isCollapsed: boolean;
}

const ChatList: React.FC<ChatList> = ({ isCollapsed }) => {
  const [chatList, setChatList] = useState([]);
  const user = useStoreState((state: any) => state?.userObj?.UserObj);
  const { data, isLoading, refetch } = useQuery<any>({
    queryKey: ['chatlist'],
    url: `${ApiUrl.GET_CHAT_LIST}/${user.id}`,
    showToast: true,
  });
  useEffect(() => {
    if (data && !isLoading) {
      setChatList(data);
    }
  }, [data, isLoading]);

  useEffect(() => {
    refetch();
  }, [isCollapsed]);

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
    <div className="no-scrollbar h-full w-full overflow-y-auto">
      <Listbox
        aria-labelledby="listbox-label"
        id="sidebar-list"
        className="Scroller-Class lg:overflow-y-[initial] flex flex-col items-center justify-center gap-1 px-2 lg:max-h-[initial]"
      >
        {chatList.map((chat: any, index: number) => (
          <ListboxItem
            key={`menu-${chat.id}-${index}`}
            className="flex items-center justify-center text-[#64748B]"
            classNames={{
              base: 'rounded-[99px] p-2 w-auto',
            }}
            textValue={chat.title}
          >
            <Link
              href={`${process.env.NEXT_PUBLIC_SITE_URL}/overview/${chat._id}`}
            >
              {!isCollapsed && (
                <span className="font-Jakarta text-sm font-medium">
                  {chat.title.slice(0, 20) + '...'}
                </span>
              )}
            </Link>
          </ListboxItem>
        ))}
      </Listbox>
    </div>
  );
};

export default ChatList;
