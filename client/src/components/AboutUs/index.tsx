import React from 'react';
import Text from '@/common/text/Index';
import GenericImage from '@/common/GenericImage';
import TestmonialCards from './SilderTeam';

const AboutUs = () => {
  return (
    <>
      <div className="flex items-center justify-center bg-[url('https://dc3yp5a9dizw2.cloudfront.net/images/bg-aboutus.jpg')] bg-cover bg-center py-16 md:py-24 xl:h-[760px] xl:py-0">
        <div className="px-4 text-center xl:px-0">
          <h2 className="font-Jakarta text-[56px] font-bold text-blue-50">
            About Us
          </h2>
          <Text className="mx-auto mt-4 max-w-[460px] font-Jakarta text-base font-normal !text-white sm:text-lg">
            Empowering Developers with AI Innovation Transforming the way you
            code with cutting-edge AI solutions.
          </Text>
        </div>
      </div>
      <div className="md:max-[720px] mx-auto mb-16 mt-14 flex w-full flex-col items-center gap-5 px-4 md:flex-row lg:mb-44 lg:mt-32 lg:max-w-5xl lg:gap-8 2xl:flex-row 2xl:gap-[168px] 2xl:p-0 min-[1560px]:max-w-[1620px] min-[1620px]:max-w-[1620px]">
        <div className="w-full">
          <h2 className="font-Jakarta text-3xl font-bold text-contactcolors-100 sm:text-6xl">
            Our Story
          </h2>
          <Text className="mt-4 text-base font-normal leading-[30px] !text-[#4F4E4E] sm:text-lg">
            At AI DEV, we’re redefining software development with the power of
            AI. Our mission is simple: make coding faster, smarter, and more
            intuitive. Founded by a team of AI enthusiasts, we’ve built a tool
            that saves time, reduces errors, and boosts productivity
          </Text>
          <Text className="mt-5 text-base font-normal leading-[30px] !text-[#4F4E4E] sm:text-lg">
            From a small idea to a global solution, AI DEV is trusted by
            thousands of developers worldwide. We enable you to focus on what
            matters—creativity and innovation—while our AI handles the
            repetitive.
          </Text>
          <h2 className="mt-5 font-Jakarta text-3xl font-bold text-contactcolors-100 sm:text-6xl">
            Our Mission
          </h2>
          <Text className="text-base font-normal leading-[30px] !text-[#4F4E4E] sm:text-lg">
            At AI DEV, we’re redefining software development with the power of
            AI. Our mission is simple: make coding faster, smarter, and more
            intuitive. Founded by a team of AI enthusiasts, we’ve built a tool
            that saves time, reduces errors, and boosts productivity.
          </Text>
          <Text className="mb-8 mt-5 text-base font-normal leading-[30px] !text-[#4F4E4E] sm:text-lg">
            From a small idea to a global solution, AI DEV is trusted by
            thousands of developers worldwide. We enable you to focus on what
            matters—creativity and innovation—while our AI handles the
            repetitive
          </Text>
        </div>
        <div className="rounded-br-6 mx-auto flex h-full w-full justify-end rounded-2xl bg-contact-gradient lg:max-w-[656px]">
          <GenericImage
            classNames={{ wrapper: '!max-w-none w-full' }}
            alt="vision-story"
            src="https://dc3yp5a9dizw2.cloudfront.net/images/aboutstory.jpg"
            className="h-[320px] w-full rounded-tl-[28px] object-cover pl-5 pt-5 md:h-[682px]"
          />
        </div>
      </div>
      <div className="md:max-[720px] mx-auto mb-16 flex max-w-full flex-col items-center justify-between gap-5 bg-contact-gradient px-4 py-6 md:flex-row lg:mb-[120px] lg:max-w-5xl lg:rounded-2xl 2xl:p-0 min-[1620px]:max-w-[1620px]">
        <div className="flex w-full justify-center lg:py-16">
          <GenericImage
            alt="Dev ai"
            src="asstes/images/AIDev.png"
            classNames={{
              img: 'sm:px-0 sm:h-[445px] lg:w-[443px] py-7 sm:py-0',
            }}
          />
        </div>
        <div className="flex w-full flex-col items-start justify-center px-0 sm:px-4 xl:px-0">
          <h2 className="font-Jakarta text-3xl font-bold text-white sm:text-6xl">
            Why AI DEV?
          </h2>
          <Text className="mt-4 max-w-[601px] text-base font-normal !text-white sm:text-lg">
            Next-Gen AI Technology: Real-time code suggestions, bug fixes, and
            optimizations. Developer-Centric Design.
          </Text>
          <Text className="mb-6 mt-2 max-w-[601px] text-base font-normal !text-white sm:mb-0 sm:text-lg">
            Streamlined for speed and ease-of-use. Constantly Evolving: Access
            the latest AI advancements, always.
          </Text>
        </div>
      </div>
      <div className="mb-[51px] text-center">
        <h2 className="font-Jakarta text-3xl font-bold text-contactcolors-100 sm:text-6xl">
          Meet the Team
        </h2>
      </div>
      <TestmonialCards />
    </>
  );
};

export default AboutUs;
