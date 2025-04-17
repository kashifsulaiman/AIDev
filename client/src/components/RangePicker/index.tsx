import { Slider, SliderProps } from '@nextui-org/react';
import { useState } from 'react';
import { StoreModel } from '@/redux/model';
import { useStoreActions, useStoreState } from 'easy-peasy';

export interface RangePickerProps extends SliderProps {
  className?: string;
}

const RangePicker: React.FC<RangePickerProps> = ({
  className = `w-full max-w-[250px]`,
  color = 'foreground',
  defaultValue = 2,
  maxValue = 10,
  minValue = 1,
  showSteps = true,
  size = 'sm',
  step = 1,
  ...props
}) => {
  const {
    selfPromptingIteration: { selectedIteration },
  } = useStoreState<StoreModel>((state) => state.selfPromptingModel);
  const { setSelectedIteration } = useStoreActions<StoreModel>(
    (actions) => actions.selfPromptingModel
  );
  const initialValue = Array.isArray(defaultValue)
    ? defaultValue[0]
    : selectedIteration;
  const [value, setValue] = useState<number>(initialValue);

  const handleChange = (newValue: number | number[]) => {
    const newVal = Array.isArray(newValue) ? newValue[0] : newValue;
    const clamped = newVal < 2 ? 2 : newVal;
    setValue(clamped);
    setSelectedIteration(clamped);
  };

  return (
    <div className="px-2 pb-3 pt-2">
      <Slider
        className={className}
        color={color}
        value={value}
        defaultValue={selectedIteration || defaultValue}
        onChange={handleChange}
        label={`${value} Iterations`}
        maxValue={maxValue}
        minValue={minValue}
        showSteps={showSteps}
        size={size}
        step={step}
        classNames={{
          track: 'bg-custom-purple',
          filler: 'bg-custom-gradient',
          thumb:
            'w-4 h-4 after:w-3 after:h-3 after:bg-custom-gradient after:shadow-none bg-custom-gradient',
          labelWrapper: 'flex justify-end',
          label: 'text-custom-purple',
          value: 'hidden',
        }}
        {...props}
      />
    </div>
  );
};

export default RangePicker;
