import React from 'react';

interface Props {
  heading: string;
  text: React.ReactNode;
  textBottom?: React.ReactNode;
  index: number;
  isBullet?: boolean;
  bullets?: React.ReactNode[];
}

const Policy = ({
  heading,
  text,
  index,
  textBottom,
  isBullet = false,
  bullets = [],
}: Props) => {
  const isBulletsArray = Array.isArray(bullets);

  return (
    <div className="mb-6">
      <h5 className="mb-4 font-Jakarta text-2xl font-bold text-[#0E2242]">
        {index}. {heading}
      </h5>
      <p className="mb-2 font-Jakarta text-[18px] text-[#4F4E4E]">{text}</p>
      {isBullet && isBulletsArray && bullets.length > 0 && (
        <ul className="ml-5 list-disc">
          {bullets.map((bullet, idx) => (
            <li key={idx} className="text-[18px] text-[#4F4E4E]">
              {bullet}
            </li>
          ))}
        </ul>
      )}
      {textBottom && (
        <p className="font-Jakarta text-lg text-[#4F4E4E]">{textBottom}</p>
      )}
    </div>
  );
};

export default Policy;
