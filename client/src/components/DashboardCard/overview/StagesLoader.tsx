import { useState, useEffect } from 'react';
import Toptext from './Toptext';
import { StoreModel } from '@/redux/model';
import { useStoreState } from 'easy-peasy';

export default function StagesLoader() {
  const { loader } = useStoreState<StoreModel>(
    (state) => state?.promptModel?.prompt
  );

  const steps = [
    'Extracting Information from user prompt',
    'Refining User Prompt',
    'Requesting code generation from AI',
    'Structuring generated code into a project',
    'Maintaining Conversation History',
  ];

  const [stage, setStage] = useState(0);
  const [loadingStates, setLoadingStates] = useState([
    true,
    false,
    false,
    false,
    false,
  ]);

  useEffect(() => {
    if (!loader) return;

    const intervals = steps.map((_, index) =>
      setTimeout(() => {
        setStage(index);
        setLoadingStates((prev) => prev.map((_, i) => i === index));
      }, index * 5000)
    );

    return () => intervals.forEach(clearTimeout);
  }, [loader]);

  return (
    <>
      {loader
        ? steps.map(
            (text, index) =>
              stage >= index && (
                <Toptext
                  key={index}
                  text={text}
                  loading={loadingStates[index]}
                />
              )
          )
        : steps.map((text, index) => (
            <Toptext key={index} text={text} loading={false} />
          ))}
    </>
  );
}
