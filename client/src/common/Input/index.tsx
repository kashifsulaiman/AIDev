'use client';
import { Input } from '@nextui-org/input';

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
  readonly labelClass?: string;
}

export default function CInput({
  onChange,
  placeholder,
  startIcon,
  label,
  labelPlacement = 'outside',
  isRequired = false,
  onClear,
  value,
  isClearable = false,
  type = 'text',
  readonly,
  errorMessage,
  max,
  onFocus,
  onBlur,
  className,
  ref,
  disabled,
  inputClass,
  inputWrapperClass,
  labelClass,
  onClick,
  ...rest
}: Readonly<InputTypes>) {
  // const [showPassword, setShowPassword] = useState(false);

  return (
    <Input
      {...rest}
      ref={ref}
      className={`${className} placeholder:text-authgray-200`}
      classNames={{
        inputWrapper: `md:pl-3 pl-1 bg-transparent !ring-0 !ring-transparent ${isClearable && 'pr-6'} border ${errorMessage ? 'border-red-400' : 'border-[#94A3B8]'} md:h-[44px] h-[24px] data-[hover=true]:bg-transparent group-data-[focus]:bg-[#f6f6f6] group-data-[focus]:border-primary-100 rounded-lg ${inputWrapperClass}`,
        innerWrapper: 'bg-transparent',
        input: `text-black-400 bg-transparent text-sm px-2 font-Jakarta font-normal ${inputClass} date-input`,
        label: ` font-medium font-Jakarta !text-[#111827] ${labelClass ? labelClass : 'text-sm sm:text-base'}`,
        base: 'mb-4',
        errorMessage: 'text-red-400',
      }}
      // endContent={
      //   type === 'password' ? (
      //     <button
      //       className={'cursor-pointer'}
      //       type="button"
      //       onClick={() => setShowPassword(!showPassword)}
      //     >
      //       {showPassword ? (
      //         <span>{/* <EyeClose /> */}</span>
      //       ) : (
      //         <span>{/* <EyeOpen /> */}</span>
      //       )}
      //     </button>
      //   ) : !isClearable ? (
      //     ''
      //   ) : (
      //     <span>{/* <InputClose /> */}</span>
      //   )
      // }
      errorMessage={errorMessage}
      isClearable={isClearable}
      isDisabled={disabled}
      isInvalid={!!errorMessage}
      isRequired={isRequired}
      label={label}
      labelPlacement={labelPlacement}
      max={max}
      placeholder={placeholder ?? 'Placeholder'}
      readOnly={readonly}
      startContent={startIcon && startIcon}
      // type={type === 'password' && showPassword ? 'text' : type}
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

export function FormikInput({ field, ...props }: any) {
  return (
    <>
      <CInput
        {...field}
        {...props}
        email
        onBlur={field.onBlur}
        onChange={field?.onChange}
      />
    </>
  );
}
