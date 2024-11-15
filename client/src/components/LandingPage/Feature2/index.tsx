import GenericImage from '@/common/GenericImage';
import VideoPlayer from '@/common/Video/video';
import React from 'react';

function Features2() {
  return (
    <>
      <div className="mx-auto max-w-full px-4 pb-6 pt-10 md:max-w-[630px] lg:max-w-[924px] lg:pb-10 lg:pt-20 xl:max-w-[1230px] min-[1640px]:max-w-[1620px] min-[1640px]:px-0">
        <div className="flex flex-col items-center justify-center">
          <h2 className="items-center text-center font-Jakarta text-3xl font-bold text-black sm:text-6xl">
            Refactor Code Automatically, Optimizes Codebase
          </h2>
          <p className="my-2 text-center font-Jakarta text-xl font-normal text-black sm:text-2xl">
            Trusted by early adopters and teams excited to shape the future
          </p>
        </div>
        <div className="mt-4 flex w-full flex-col items-center gap-4 lg:mt-10 lg:gap-6 xl:flex-row">
          <div className="relative z-10">
            <GenericImage
              src={'asstes/images/Vseditor.png'}
              alt="NextUI hero Image"
              className="h-auto w-[791px] xl:h-[529px]"
            />
            <VideoPlayer
              src="https://dc3yp5a9dizw2.cloudfront.net/videos/Codevideo1.mp4"
              poster="https://www.w3schools.com/html/mov_bbb.jpg"
              controls={false}
              autoPlay={true}
              loop={true}
              muted={true}
              className="absolute right-2.5 top-3 z-40 h-full w-[calc(100%-14%)] sm:right-5 md:top-7"
            />
          </div>
          <div className="relative z-10">
            <GenericImage
              src={'asstes/images/Vseditor.png'}
              alt="NextUI hero Image"
              className="h-auto w-[791px] xl:h-[529px]"
            />
            <VideoPlayer
              src="/asstes/images/codevideo2.mp4"
              poster="https://www.w3schools.com/html/mov_bbb.jpg"
              controls={false}
              autoPlay={true}
              loop={true}
              muted={true}
              className="absolute right-2.5 top-3 z-40 h-full w-[calc(100%-14%)] sm:right-5 md:top-7"
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Features2;
