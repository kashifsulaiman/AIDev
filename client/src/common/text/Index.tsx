import { cn } from '@nextui-org/theme';
import React, { ReactNode, forwardRef } from 'react';

const Text = forwardRef<
  HTMLParagraphElement,
  { className?: string; children: ReactNode; style?: React.CSSProperties }
>(({ className, children, style }, ref) => {
  return (
    <p
      ref={ref}
      className={cn(`font-Jakarta text-[20px] text-gray-300`, className)}
      style={style}
    >
      {children}
    </p>
  );
});

Text.displayName = 'Text';

export default Text;
