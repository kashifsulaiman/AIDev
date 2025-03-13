import { PromptingStrategyType } from '@/types/modalTypes';

export const PromptingStrategyData: PromptingStrategyType[] = [
  {
    id: 'prompt-refinement',
    label: 'Prompt-Refinement',
    description: 'Refine prompts iteratively',
  },
  {
    id: 'guided-prompting',
    label: 'Guided Prompting',
    description: 'User answers AI-generated questions',
  },
  // {
  //   id: 'self-prompting',
  //   label: 'Self-Prompting',
  //   description: 'AI generates and refines prompts',
  // },
];
