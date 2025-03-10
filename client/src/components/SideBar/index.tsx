'use client';
import React, { useState, useEffect } from 'react';
import { Button, Divider } from '@nextui-org/react';
import { DashBoard, Support, Settings, DropdownrightArrow } from '../SVG';
import GenericImage from '@/common/GenericImage';
import SidebarMenu from '../SideBar_Content';
import { useStoreActions, useStoreState } from 'easy-peasy';
import Cookies from 'js-cookie';
import { allPrompts } from '@/config/api.config';
import { useRouter } from 'next/navigation';
import { pagePaths } from '@/constants/pagePath';
import { IoFitnessOutline } from 'react-icons/io5';
import { HiBookOpen } from 'react-icons/hi2';
import { PiChatsCircleFill } from 'react-icons/pi';
import { TbBrandBlogger } from 'react-icons/tb';
import { LuCalculator } from 'react-icons/lu';
import MenuSkeleton from '../Skeletons/MenuSkeleton';
import { useAuthVerification } from '@/hooks/useAuthVerification';
import ChatList from '@/components/chatList';
import { StoreModel } from '@/redux/model';

const SidebarIconClasses = 'mx-auto max-sm:h-6 max-sm:w-6';

enum MenuName {
  'BLOG_APP' = 'Blog',
  'CHATBOT_APP' = 'Chatbot',
  'CALCULATOR_APP' = 'Calculator',
  'BOOKING_APP' = 'Booking Management',
  'FITNESS_APP' = 'Fitness',
}
export const Icons = {
  BLOG_APP: <TbBrandBlogger className={SidebarIconClasses} />,
  CHATBOT_APP: <PiChatsCircleFill className={SidebarIconClasses} />,
  CALCULATOR_APP: <LuCalculator className={SidebarIconClasses} />,
  FITNESS_APP: <IoFitnessOutline className={SidebarIconClasses} />,
  BOOKING_APP: <HiBookOpen className={SidebarIconClasses} />,
};
export default function MainSideBar() {
  const router = useRouter();
  useAuthVerification();
  const userAction = useStoreActions((actions: any) => actions.userObj.add);
  const userState = useStoreState((state: any) => state.userObj.UserObj);
  const signupAction = useStoreActions((actions: any) => actions.signupObj.add);
  const setPrompt = useStoreActions(
    (actions: any) => actions?.promptModel?.setPrompt
  );
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [prompts, setPrompts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const menuItems = [
    { label: 'Dashboard', href: '/main', icon: <DashBoard /> },
  ];
  const conversation = useStoreState<StoreModel>(
    (state) => state?.conversationModel?.conversation
  );
  const clearPrompt = useStoreActions<StoreModel>(
    (actions) => actions?.promptModel?.clearPrompt
  );
  const clearConversation = useStoreActions<StoreModel>(
    (actions) => actions?.conversationModel?.clearConversation
  );

  useEffect(() => {
    const fetchPrompts = async () => {
      const data = await allPrompts();
      if (data.length > 0) {
        const menus = data?.map((menu: any) => ({
          label:
            MenuName[menu.template?.toUpperCase() as keyof typeof MenuName],
          href: `/main?promptType=${menu.template}`,
          icon: Icons[menu.template?.toUpperCase() as keyof typeof Icons],
        }));
        setPrompts(menus);
        setIsLoading(false);
      }
    };
    fetchPrompts();
  }, []);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const additionalMenuItems = [
    { label: 'Support', href: '/coming-soon', icon: <Support /> },
    { label: 'Settings', href: '/coming-soon', icon: <Settings /> },
  ];

  const handleItemClick = (label: string) => {
    if (label === 'Dashboard') {
      clearPrompt();
      clearConversation();
    }
    setPrompt(null);
    if (window.innerWidth < 992) {
      setIsCollapsed(false);
    } else {
      setIsDrawerOpen(false);
    }
  };

  const toggleCollapse = () => {
    setIsCollapsed((prevState) => !prevState);
  };

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      const drawer = document.getElementById('custom-drawer');
      const sidebar = document.querySelector('.sidebar');
      const isSmallScreen = window.innerWidth <= 1280;

      if (isSmallScreen) {
        if (drawer && !drawer.contains(event.target as Node)) {
          setIsDrawerOpen(false);
        }

        if (sidebar && !sidebar.contains(event.target as Node)) {
          setIsCollapsed(true);
        }
      }
    };

    if (isDrawerOpen || !isCollapsed) {
      document.addEventListener('click', handleOutsideClick);
    } else {
      document.removeEventListener('click', handleOutsideClick);
    }

    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [isDrawerOpen, isCollapsed]);

  const handleLogout = () => {
    Cookies?.remove('jwtToken');
    router.push(pagePaths.LOGIN);
    userAction({});
    signupAction({
      form: 'SignUpForm',
      email: '',
    });
  };

  return (
    <>
      <div
        id="sidebar"
        className={`sidebar fixed inset-y-0 z-10 flex h-screen flex-col bg-white shadow-xl transition-all duration-150 ${
          isCollapsed ? 'w-16 max-sm:w-10' : 'w-[280px]'
        }`}
      >
        <div className="absolute -right-3 top-7 block">
          <Button
            onClick={toggleCollapse}
            className={`max-h-6 min-w-6 rounded-full border-1 border-[#E2E8F0] bg-white p-0`}
          >
            <span
              className={`transition-transform duration-300 ${
                isCollapsed ? 'rotate-0' : 'rotate-180'
              }`}
            >
              <DropdownrightArrow />
            </span>
          </Button>
        </div>

        <div
          className={`${isCollapsed ? 'justify-center px-2' : 'justify-between px-8'} flex items-center py-4`}
        >
          {isCollapsed ? (
            <div>
              <GenericImage alt="AC" src="/asstes/images/ad-dashboard.png" />
            </div>
          ) : (
            <GenericImage
              className="w-[6rem] object-cover shadow-lg"
              alt="logo"
              src="https://dc3yp5a9dizw2.cloudfront.net/images/aidev-logo.svg"
            />
          )}
        </div>
        {isLoading ? (
          <MenuSkeleton isCollapsed={isCollapsed} length={6} />
        ) : (
          <SidebarMenu
            items={[...menuItems, ...prompts]}
            isCollapsed={isCollapsed}
            onItemClick={handleItemClick}
          />
        )}
        <Divider className="mt-3" />
        <div
          className={`max-h-56 overflow-hidden ${isCollapsed ? 'hidden' : 'justify-between px-8'} flex items-center py-2`}
        >
          <ChatList />
        </div>
        {conversation.chatList.length > 0 && <Divider />}
        <div className="mt-auto">
          {isLoading ? (
            <MenuSkeleton isCollapsed={isCollapsed} length={2} />
          ) : (
            <SidebarMenu
              items={additionalMenuItems}
              isCollapsed={isCollapsed}
              onItemClick={handleItemClick}
            />
          )}
          <Divider className="my-2" />
          <div
            className={`flex items-end justify-between py-2 ${isCollapsed ? 'px-3 max-sm:px-2' : 'px-6'}`}
            onClick={toggleDropdown}
          >
            <div className="flex gap-3">
              <div className="size-10 overflow-hidden rounded-full max-sm:size-6">
                <GenericImage
                  alt="profile avatar"
                  src={
                    'https://dc3yp5a9dizw2.cloudfront.net/images/profile-avatar.jpg'
                  }
                  className="size-full object-cover"
                />
              </div>
              {!isCollapsed && (
                <div>
                  <p className="text-xs font-normal text-[#64748B]">Welcome</p>
                  <p className="font-Jakarta text-sm font-semibold text-black">
                    {userState?.name ?? ''}
                  </p>
                </div>
              )}
            </div>

            {!isCollapsed && (
              <button className="pb-1">
                <DropdownrightArrow />
              </button>
            )}

            {isOpen && (
              <div
                className={`${isCollapsed ? '-right-36' : '-right-16'} absolute bottom-16 z-10 mt-2 w-48 rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5`}
              >
                <div className="p-2">
                  <button
                    className="block w-full rounded-md px-2 py-2 text-left text-sm text-gray-700 hover:bg-neutral-200 sm:px-4"
                    onClick={handleLogout}
                  >
                    Log out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div
        id="custom-drawer"
        className={`fixed left-0 top-0 h-full w-64 bg-white shadow-xl transition-transform duration-300 ${
          isDrawerOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:hidden`}
      >
        <SidebarMenu
          items={[...menuItems, ...prompts]}
          isCollapsed={false}
          onItemClick={handleItemClick}
        />
      </div>
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300 ${
          isDrawerOpen ? 'z-[1] opacity-100' : 'pointer-events-none opacity-0'
        } lg:hidden`}
        onClick={() => setIsDrawerOpen(false)}
      />
    </>
  );
}
