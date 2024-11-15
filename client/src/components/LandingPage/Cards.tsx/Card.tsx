'use client';
import React from 'react';
import Text from '@/common/text/Index';
import {
  Card as NextCard,
  CardBody,
  CardFooter,
  CardHeader,
  Link,
} from '@nextui-org/react';
const Card = ({ icon, id, title, description, link }: any) => {
  return (
    <NextCard
      key={id}
      className="hover:border-card-gradient hover-border-card-gradient group flex h-full flex-col justify-between rounded-2xl border border-transparent bg-card-gradient p-5 !pr-[20px] hover:border hover:bg-custom-white"
    >
      <CardHeader className="group flex gap-3">
        <div className="flex items-center gap-4">
          <span className="flex size-10 items-center justify-center rounded-lg bg-white group-hover:border group-hover:bg-white">
            {icon}
          </span>
          <Text className="font-Jakarta text-[22px] font-bold !text-[#FFFFFF] group-hover:!text-black">
            {title}
          </Text>
        </div>
      </CardHeader>
      <CardBody className="flex-1">
        <Text className="max-w-full font-Jakarta text-sm font-normal leading-5 !text-white group-hover:!text-black sm:text-base sm:leading-[26px] lg:max-w-[404px]">
          {description}
        </Text>
      </CardBody>
      <CardFooter className="mt-0.5">
        <Link
          isExternal
          className="font-Jakarta text-base font-bold text-white underline group-hover:!text-black sm:text-lg"
          href={link}
        >
          Learn more About AI
        </Link>
      </CardFooter>
    </NextCard>
  );
};

export default Card;
