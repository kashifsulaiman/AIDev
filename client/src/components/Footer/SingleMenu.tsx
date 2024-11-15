import Link from 'next/link';
import React from 'react';

const SingleMenu = ({
  title,
  data,
}: {
  title: string;
  data: {
    id: string;
    text: string;
    link: string;
  }[];
}) => {
  return (
    <div>
      <h3 className="mb-4 font-Jakarta text-lg font-bold text-[#911EC1]">
        {title}
      </h3>
      <ul className="flex flex-col gap-2 sm:gap-4">
        {data?.map((value) => {
          return (
            <Link key={value?.id} href={value?.link}>
              <li className="font-Jakarta text-[20.35px] font-normal text-white">
                {value?.text}
              </li>
            </Link>
          );
        })}
      </ul>
    </div>
  );
};

export default SingleMenu;
