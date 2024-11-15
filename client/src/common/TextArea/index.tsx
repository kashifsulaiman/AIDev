'use client';

import { Textarea } from '@nextui-org/input';

interface InputTypes {
  readonly onChange?: any;

  readonly onClick?: any;

  readonly placeholder?: string;

  readonly startIcon?: any;

  readonly label?: string;

  readonly name?: string;

  readonly labelPlacement?: any;

  readonly isRequired?: boolean;

  readonly className?: string;

  readonly value?: any;

  readonly onClear?: any;

  readonly isClearable?: boolean;

  readonly type?: any;

  readonly readonly?: boolean;

  readonly errorMessage?: string;

  readonly max?: number | string;

  readonly onFocus?: any;

  readonly onBlur?: any;

  readonly ref?: any;

  readonly disabled?: boolean;

  readonly inputWrapperClass?: string;

  readonly inputClass?: string;
}

export default function CTextArea({
  onChange,

  placeholder,

  startIcon,

  label,

  labelPlacement = 'outside',

  isRequired = false,

  onClear,

  value,

  type = 'text',

  readonly,

  errorMessage,

  max,

  onFocus,

  onBlur,

  className,

  ref,

  disabled,

  onClick,

  ...rest
}: Readonly<InputTypes>) {
  return (
    <Textarea
      {...rest}
      ref={ref}
      className={`${className}`}
      classNames={{
        inputWrapper:
          'border border-[#94A3B8] hover:bg-transparent focus:bg-transparent lg:!h-[288px]',

        base: 'mt-6',

        input: '!min-h-full',
      }}
      errorMessage={errorMessage}
      isDisabled={disabled}
      isInvalid={!!errorMessage}
      isRequired={isRequired}
      label={label}
      labelPlacement={labelPlacement}
      max={max}
      placeholder={placeholder ?? 'Placeholder'}
      readOnly={readonly}
      startContent={startIcon && startIcon}
      type={type}
      value={value}
      onBlur={onBlur}
      onChange={onChange}
      onClear={onClear}
      onClick={onClick}
      onFocus={onFocus}
    />
  );
}

export function FormikTextArea({ field, ...props }: any) {
  return (
    <>
      <CTextArea
        {...field}
        {...props}
        email
        onBlur={field.onBlur}
        onChange={field?.onChange}
      />
    </>
  );
}
