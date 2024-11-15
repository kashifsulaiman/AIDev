import React from 'react';
import { Checkbox as NextCheckbox } from '@nextui-org/checkbox';

const Checkbox = ({
  label,
  field,
  form: { setFieldValue, errors },
  ...props
}: any) => {
  return (
    <>
      <NextCheckbox
        className="font-Jakarta text-sm font-medium !text-authgray-300"
        classNames={{
          wrapper: `rounded-[4px] !bg-transparent  data-[hover=true]:!bg-[#0F172A] after:!bg-black border  ${field.name in errors && 'border-[#F87171]'}`,
          icon: 'bg-green',
        }}
        radius="none"
        onValueChange={(value) => {
          setFieldValue(field.name, value);
        }}
        {...props}
      >
        {' '}
        {label}
      </NextCheckbox>
    </>
  );
};

export default Checkbox;

const SimpleCheckbox = ({ label, onChange, isSelected }: any) => {
  return (
    <NextCheckbox
      className="text-sm font-medium leading-5 text-black sm:text-base sm:leading-6"
      classNames={{
        wrapper: 'rounded-[4px]',
      }}
      isSelected={isSelected}
      radius="none"
      onChange={onChange}
    >
      {' '}
      {label}
    </NextCheckbox>
  );
};

export { SimpleCheckbox };
