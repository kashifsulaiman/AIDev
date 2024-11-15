'use client';
import React from 'react';
import { CheckIcon } from '@/components/SVG';
import Text from '@/common/text/Index';
import { CButton } from '@/common/button';
import { Card, CardBody, CardFooter, CardHeader } from '@nextui-org/react';
import { useRouter } from 'next/navigation';
interface Props {
  title: string;
  subTitle: string;
  subtit?: string;
  price: any;
  description: string;
  buttonLabel: string;
  keyLabel: string;
  keyFeatures: string[];
  mostPopular?: boolean;
}

const SingleCard: React.FC<Props> = ({
  title,
  subTitle,
  subtit,
  price,
  description,
  buttonLabel,
  keyLabel,
  keyFeatures,
  mostPopular = false,
}) => {
  const router = useRouter();

  const handleClick = () => {
    router.push('/log-in');
  };
  return (
    <div className="h-full pt-7">
      <Card
        className={`relative h-full max-w-full overflow-visible rounded-2xl border-[1.1px] ${
          mostPopular
            ? 'border-blueTheme-600 bg-gradient-to-r from-custom-purple to-custom-blue'
            : 'border-gray-100 bg-white'
        } px-5 py-12 sm:px-[31px] min-[1640px]:max-w-[516px]`}
      >
        {mostPopular && (
          <div className="z-100 absolute -top-6 left-[50%] z-10 flex !h-[48.86px] w-[243.79px] -translate-x-1/2 transform items-center justify-center rounded-[50px] !bg-white font-Sora text-[17.73px] font-semibold leading-[22.34px] text-blueTheme-100 shadow-custom">
            MOST POPULAR
          </div>
        )}

        <CardHeader className="flex flex-col items-start gap-2 xl:gap-3">
          <div className="flex flex-wrap items-center gap-1 min-[500px]:gap-3 2xl:flex-nowrap 2xl:gap-6">
            <Text
              className={`font-Jakarta text-[34px] font-semibold leading-none md:text-[44px] xl:leading-normal ${mostPopular ? 'text-white' : '!text-black'}`}
            >
              {title}
            </Text>
            <span
              className={`text-nowrap font-Jakarta text-[24px] font-semibold ${mostPopular ? 'text-white' : '!text-black'}`}
            >
              ({subTitle})
            </span>
          </div>

          {subtit && (
            <p
              className={`font-Jakarta text-[32px] font-bold leading-none xl:leading-normal ${mostPopular ? 'text-white' : 'text-black'}`}
            >
              {subtit}
            </p>
          )}
        </CardHeader>

        <CardBody className="justify-around py-2">
          {price.original && (
            <div className="flex items-center gap-3">
              <p className="text-[32px] font-bold text-gray-100 line-through">
                {price.original}
              </p>
              <p className="font-Jakarta text-[32px] font-bold text-black">
                {price.current}
              </p>
              <p className="font-Jakarta text-[17.73px] font-normal text-gray-100">
                {price.perMonth}
              </p>
            </div>
          )}

          <p
            className={`${mostPopular ? 'text-white' : 'text-blakeTheme-500'} font-Jakarta text-base font-normal md:text-lg`}
          >
            {description}
          </p>
        </CardBody>

        <CButton
          className={`mt-7 h-[48.86px] max-w-[188.06px] rounded-[50px] py-[17.73px] ${
            mostPopular
              ? '!bg-white text-blueTheme-100'
              : 'bg-gradient-to-r from-custom-purple to-custom-blue text-white'
          } font-bold md:text-lg`}
          label={buttonLabel}
          variant="secondary"
          onClick={handleClick}
        />

        <p
          className={`${mostPopular ? 'text-white' : 'text-darkblue-100'} my-8 font-Jakarta text-2xl font-semibold`}
        >
          {keyLabel}
        </p>

        <CardFooter className="flex flex-col items-start gap-5 px-0">
          {keyFeatures.map((feature, idx) => (
            <div key={idx} className="flex items-start gap-[14.41px]">
              <span className={`${mostPopular ? 'text-white' : ''}`}>
                <CheckIcon />
              </span>
              <span
                className={`font-Jakarta text-base font-medium ${mostPopular ? 'text-white' : 'text-gray-200'}`}
              >
                {feature}
              </span>
            </div>
          ))}
        </CardFooter>
      </Card>
    </div>
  );
};

export default SingleCard;
