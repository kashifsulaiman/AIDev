import { Slider, SliderProps } from '@nextui-org/react';
import { useState } from 'react';
import { StoreModel } from '@/redux/model';
import { useStoreActions, useStoreState } from 'easy-peasy';

export interface RangePickerProps extends SliderProps {
  className?: string;
}

const RangePicker: React.FC<RangePickerProps> = ({
  className = 'max-w-md',
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
    setValue(newVal < 2 ? 2 : newVal);
    setSelectedIteration(newVal);
  };

  return (
    <div>
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
          track: 'bg-custom-purple/30',
          filler: 'bg-custom-purple',
          thumb: 'bg-custom-purple',
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
