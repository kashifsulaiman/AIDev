import { MAX_TOKENS } from '@/constants/files-import';
import { CapacitySectionInterface } from '@/types/interface';
import { Progress } from '@nextui-org/react';
import { useCallback } from 'react';

export default function CapacitySection({
  capacity,
}: CapacitySectionInterface) {
  const capacityPercentage: () => number = useCallback(() => {
    const newCapacity = Number(((capacity / MAX_TOKENS) * 100).toFixed(2));
    return newCapacity ?? 0;
  }, [capacity]);

  return (
    <div className="flex w-full flex-col items-start pt-4">
      <span className="text-sm">
        {capacityPercentage()} % of capacity reached
      </span>
      <Progress
        classNames={{
          indicator:
            capacityPercentage() > 100 ? 'bg-red-600' : 'bg-custom-purple',
        }}
        aria-label="capacity"
        value={capacityPercentage()}
      />
    </div>
  );
}
