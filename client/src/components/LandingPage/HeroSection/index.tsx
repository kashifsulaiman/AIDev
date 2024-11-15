'use client';
import React, { useEffect, useRef } from 'react';
import GenericImage from '@/common/GenericImage';
import VideoPlayer from '@/common/Video/video';
import { CButton } from '@/common/button';
import { useRouter } from 'next/navigation';
function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const router = useRouter();

  const handleClick = () => {
    router.push('/log-in');
  };
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch((error) => {
        console.error('Error attempting to play the video:', error);
      });
    }
  }, []);

  return (
    <div className="z-10 mx-auto flex max-w-full flex-col items-start justify-between gap-[47px] px-4 pb-6 pt-10 md:max-w-[630px] lg:max-w-[924px] lg:pb-10 lg:pt-20 xl:max-w-[1230px] xl:flex-row xl:items-center min-[1640px]:max-w-[1620px] min-[1640px]:px-0">
      <div className="flex max-w-[634px] flex-col items-center text-center md:items-start md:text-start">
        <h2 className="z-10 font-Jakarta text-[38px] font-bold leading-[40px] text-[#000000] md:text-[65px] md:leading-[85px]">
          Revolutionize Your Coding Experience with AI DEV
        </h2>
        <p className="z-10 mb-[45px] mt-[27px] max-w-[580px] font-Jakarta text-2xl font-normal text-[#000000] md:text-2xl">
          Empower your development process with AI-driven efficiency and
          seamless code generation.
        </p>
        <div className="flex cursor-pointer justify-start">
          <CButton
            className="z-[1] h-[63px] rounded-[100px] px-14 py-5 font-Jakarta text-base font-bold text-white md:text-lg"
            label="Start Your Free Trial "
            onClick={handleClick}
          />
        </div>
      </div>
      <div className="relative z-10 shadow-custom-hero">
        <GenericImage
          src="https://dc3yp5a9dizw2.cloudfront.net/images/Transform.jpg"
          alt="NextUI hero Image"
          className="w-full rounded-none min-[1280px]:h-[529px]"
        />
        <VideoPlayer
          src="https://dc3yp5a9dizw2.cloudfront.net/videos/Transform.mp4"
          poster="https://dc3yp5a9dizw2.cloudfront.net/videos/Transform.mp4"
          controls={false}
          autoPlay={true}
          loop={true}
          muted={true}
          className="absolute right-0 top-0 z-40 h-full w-[calc(100%-14%)] sm:right-3"
        />
      </div>
    </div>
  );
}

export default HeroSection;
