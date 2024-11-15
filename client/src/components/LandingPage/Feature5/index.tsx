import { False, True } from '@/components/SVG';
import React from 'react';

interface Feature {
  title: string;
  values: boolean[];
}

const featuresData: { [category: string]: Feature[] } = {
  Build: [
    {
      title: 'Real-time Code Suggestions',
      values: [true, true, true],
    },
    {
      title: 'Code Refactoring & Optimization',
      values: [true, true, true],
    },
    {
      title: 'Team Collaboration Tools',
      values: [false, false, true],
    },
  ],
  Deploy: [
    {
      title: 'API & IDE Integrations',
      values: [false, true, true],
    },
    {
      title: 'Priority Support',
      values: [true, true, true],
    },
    {
      title: 'User Licenses',
      values: [false, false, true],
    },
    {
      title: 'Security & Compliance',
      values: [true, true, true],
    },
  ],
  Promotions: [
    {
      title: 'Custom Model Training',
      values: [true, true, true],
    },
    {
      title: 'Extended Enterprise-level',
      values: [false, true, true],
    },
    {
      title: 'Dedicated Account Manager',
      values: [false, false, true],
    },
    {
      title: 'Customizable',
      values: [true, true, true],
    },
  ],
};

const renderIcon = (value: boolean) => (value ? <True /> : <False />);

function Features5() {
  return (
    <div className="mx-auto max-w-full px-4 pb-6 md:max-w-[630px] lg:max-w-[924px] lg:pb-2 xl:max-w-[1230px] min-[1640px]:max-w-[1620px] min-[1640px]:px-0">
      {Object.keys(featuresData).map((category) => (
        <div key={category} className="flex flex-col">
          <div className="mb-4 mt-6 lg:mt-8">
            <h2 className="font-Jakarta text-2xl font-semibold leading-6 text-black">
              {category}
            </h2>
          </div>
          {featuresData[category].map((feature, index) => (
            <div
              key={index}
              className={`block cursor-pointer gap-2 border-x-0 border-t-[0.6px] border-bordercolors-100 last:border-b-[0.6px] hover:bg-[#A034F00F] sm:flex ${index % 2 !== 0 ? 'bg-[#A034F00F]' : ''}`}
            >
              <div className="flex items-center border-r-0 border-bordercolors-100 py-[22px] pl-6 sm:border-r-[0.6px]">
                <p className="w-80 font-Jakarta text-base font-normal text-gray-200">
                  {feature.title}
                </p>
              </div>
              <div className="flex w-full border-t-1 border-bordercolors-100 sm:border-t-0">
                {feature.values.map((value, idx) => (
                  <div
                    key={idx}
                    className={`flex basis-[33%] items-center justify-center ${
                      idx !== feature.values.length - 1
                        ? 'border-r-[0.6px] border-bordercolors-100'
                        : ''
                    }`}
                  >
                    <div className="p-3">{renderIcon(value)}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default Features5;
