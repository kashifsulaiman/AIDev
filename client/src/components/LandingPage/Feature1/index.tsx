'use client';
import { CButton } from '@/common/button';
import GenericImage from '@/common/GenericImage';
import Text from '@/common/text/Index';
import VideoPlayer from '@/common/Video/video';
import { useRouter } from 'next/navigation';
import React from 'react';

function Features1() {
  const router = useRouter();

  const handleClick = () => {
    router.push('/about-us');
  };
  return (
    <>
      <div className="mx-auto max-w-full px-4 pb-6 pt-10 md:max-w-[630px] lg:max-w-[924px] lg:pb-16 lg:pt-20 xl:max-w-[1230px] min-[1640px]:max-w-[1620px] min-[1640px]:px-0">
        <div className="flex flex-col items-center justify-center">
          <h2 className="items-center text-center font-Jakarta text-3xl font-bold text-black sm:text-6xl">
            Boost Productivity with AI Assistance
          </h2>
          <Text className="mb-12 mt-4 max-w-[638px] text-center font-Jakarta text-xl font-normal !text-black sm:text-2xl">
            Boost Code Efficiency and Minimize Errors with Smarter Assistance
          </Text>
        </div>
        <div className="flex h-auto w-full flex-col items-center justify-center gap-[60px] rounded-[32px] bg-black bg-[url('https://dc3yp5a9dizw2.cloudfront.net/images/Section2.jpg')] bg-cover bg-center p-10 md:justify-between xl:h-[745px] xl:flex-row 2xl:gap-28 2xl:pl-32 2xl:pr-40">
          <div>
            <Text className="font-Jakarta text-3xl font-bold !text-[#A61EEC] sm:text-5xl">
              {'//Highly personalized AI'}
            </Text>
            <Text className="mb-[22px] font-Jakarta text-[32px] font-bold !text-white">
              that fits how you work//
            </Text>
            <VideoPlayer
              src="/asstes/images/CodeVideo.mp4"
              poster="https://www.w3schools.com/html/mov_bbb.jpg"
              controls={false}
              autoPlay={true}
              loop={true}
              muted={true}
              className="h-auto w-full md:max-w-[602px]"
            />
            <CButton
              onClick={handleClick}
              className="mt-4 h-[53px] rounded-[100px] px-[30px] py-2.5 text-base font-bold text-white md:px-14 md:py-[15px] md:text-lg"
              label="Learn More"
            />
          </div>
          <div>
            <GenericImage
              alt="Event Image"
              className="h-auto w-full max-w-[757px] object-cover"
              src={'https://dc3yp5a9dizw2.cloudfront.net/images/Digital.jpg'}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Features1;
