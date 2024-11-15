import { Button, Spinner, cn } from '@nextui-org/react';
import React from 'react';

interface ButtonsProps {
  label?: string;
  className?: string;
  colorPrimary?: boolean;
  as?: any;
  href?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  variant?: 'primary' | 'secondary';
  type?: 'button' | 'submit' | 'reset';
  isDisabled?: boolean;
  isLoading?: boolean; // New isLoading prop
}

export const CButton = ({
  className,
  as,
  href,
  label,
  colorPrimary,
  onClick,
  variant = 'primary',
  type = 'button',
  isDisabled,
  isLoading = false,
}: ButtonsProps) => {
  return (
    <Button
      as={as}
      href={href}
      onClick={onClick}
      type={type}
      isDisabled={isDisabled || isLoading}
      className={cn(
        'rounded-full border py-4 font-Jakarta text-white',
        {
          'border-blueTheme-600 bg-custom-gradient': variant === 'primary',
          'border bg-transparent': variant === 'secondary',
        },
        className
      )}
    >
      {isLoading ? (
        <Spinner
          size="sm"
          className={colorPrimary ? 'text-primary-100' : 'text-white'}
        />
      ) : (
        label
      )}
    </Button>
  );
};
