import { Tick } from '@/components/SVG';
import { Spinner } from '@nextui-org/react';
import React from 'react';
interface Props {
  text: string;
  loading: boolean;
}
const Toptext = ({ text, loading }: Props) => {
  return (
    <div className="mb-2 flex gap-7">
      {loading ? <Spinner /> : <Tick />}
      <p className="font-Jakarta text-base font-normal text-black">{text}</p>
    </div>
  );
};

export default Toptext;
