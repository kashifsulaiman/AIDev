import GenericImage from '@/common/GenericImage';
import Text from '@/common/text/Index';

import React from 'react';

interface Props {
  paragraph: string;
  profileName: string;
  designation: string;
}
const TestimonialCard = ({ paragraph, profileName, designation }: Props) => {
  return (
    <div className="size-full pt-4">
      <div className="flex size-full justify-center">
        <div className="h-full rounded-2xl bg-primary-100 pr-2 md:pr-4">
          <div className="-mt-2 size-full rounded-2xl border border-[#E7E7E7] bg-white py-12 md:-mt-4">
            <div className="ml-auto mr-3 h-full pl-10 2xl:pl-24">
              {/* <div className="mb-4 flex justify-start">
                <StartIcon />
                <StartIcon />
                <StartIcon />
                <StartIcon />
                <StartIcon />
              </div> */}
              <div className="flex h-full flex-col justify-between">
                <Text className="mb-4 text-base !text-black md:text-[20px] 2xl:text-2xl">
                  {paragraph}
                </Text>

                <div className="flex">
                  <div className="flex items-start justify-start gap-3">
                    <div className="h-[50px] w-[50px] overflow-hidden rounded-full bg-[#B7B7B7]">
                      <GenericImage
                        classNames={{ wrapper: '!max-w-none w-full' }}
                        alt="vision-story"
                        src="https://dc3yp5a9dizw2.cloudfront.net/images/aboutstory.jpg"
                        className="size-full object-cover"
                      />{' '}
                    </div>
                    <div className="mb-4 flex flex-col">
                      <div className="inline-block">
                        <h3 className="text-[20px] font-extrabold">
                          {profileName}
                        </h3>
                        <Text className="text-base text-[#505050]">
                          {designation}
                        </Text>
                      </div>
                      {/* <div className="flex items-center gap-1">
                        <ThumbsUp />
                        <Text className="text-base font-extrabold !text-[#000]">
                          Testimonials
                        </Text>
                      </div> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;
