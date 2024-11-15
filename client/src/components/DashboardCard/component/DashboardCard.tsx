import ExpandableText from '@/common/Generic/ExpandableText';
import React from 'react';

interface DashboardCardProps {
  title: string;
  description: string;
  onClick: any;
  Icon: JSX.Element | null;
  isSelected: boolean;
}

const DashboardCard = ({
  title,
  description,
  onClick,
  Icon,
  isSelected,
}: DashboardCardProps) => {
  return (
    <div
      className={`group cursor-pointer rounded-2xl border border-gray-150 p-4 shadow-md ${
        isSelected
          ? 'bg-custom-gradient text-white'
          : 'bg-white hover:bg-custom-gradient'
      }`}
      onClick={onClick}
    >
      <div className="mb-2">
        <div
          className={`flex size-10 items-center justify-between rounded p-2 ${
            isSelected
              ? 'bg-custom-white'
              : 'bg-custom-gradient group-hover:bg-custom-white'
          }`}
        >
          <span
            className={`text-2xl ${isSelected ? 'text-custom-purple' : 'text-white group-hover:text-custom-purple'}`}
          >
            {Icon}
          </span>
        </div>
        <ExpandableText
          maxLines={2}
          text={title}
          className={`mb-2.5 mt-2 font-Jakarta text-base font-semibold ${
            isSelected ? 'text-white' : 'text-black group-hover:text-white'
          }`}
        />
      </div>
      <ExpandableText
        maxLines={3}
        isText
        text={description}
        className={`font-Jakarta text-sm ${
          isSelected ? 'text-white' : 'text-black group-hover:text-white'
        }`}
      />
    </div>
  );
};

export default DashboardCard;
