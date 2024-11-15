import Text from '@/common/text/Index';
import React from 'react';

const FooterCopyright = () => {
  const currentYear = new Date().getFullYear();
  return (
    <div className="border-t border-[#3F3F40] bg-[#111114] pb-[57px] pt-10">
      <Text className="text-center text-sm font-normal leading-[20.66px] text-white">
        © AI Dev {currentYear} | All rights reserved.
      </Text>
    </div>
  );
};

export default FooterCopyright;
