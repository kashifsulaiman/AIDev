import React from 'react';
import Text from '@/common/text/Index';
import GenericImage from '@/common/GenericImage';
import { Card } from '@nextui-org/react';

interface TeamCardProps {
  key?: number | string;
  alt: string;
  src: string;
  name: string;
  title: string;
}

const TeamCard: React.FC<TeamCardProps> = ({ key, alt, src, name, title }) => {
  return (
    <Card
      key={key}
      radius="lg"
      className="relative w-full border-none min-[1640px]:max-w-[516px]"
      classNames={{
        base: 'border-none',
      }}
    >
      <GenericImage
        classNames={{ wrapper: 'w-full !max-w-none' }}
        alt={alt}
        className="size-full object-cover"
        src={src}
      />
      <div className="absolute bottom-1 z-50 mx-4 mb-4 flex h-[126px] w-[calc(100%-2rem)] flex-col justify-center overflow-hidden rounded-lg border-1 border-white/20 bg-card-team py-1 text-center">
        <h2 className="font-Jakarta text-[32px] font-semibold text-white">
          {name}
        </h2>
        <Text className="font-Jakarta text-white">{title}</Text>
      </div>
    </Card>
  );
};

export default TeamCard;
