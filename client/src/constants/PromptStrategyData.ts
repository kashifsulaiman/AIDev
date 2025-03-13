import { PromptingStrategyType } from '@/types/modalTypes';

export const PromptingStrategyData: PromptingStrategyType[] = [
  {
    id: 'prompt-refinement',
    label: 'Prompt-Refinement',
    description: 'Refine prompts iteratively',
  },
  {
    id: 'self-prompting',
    label: 'Self-Prompting',
    description: 'AI generates and refines prompts',
  },
  {
    id: 'guided-prompting',
    label: 'Guided Prompting',
    description: 'User answers AI-generated questions',
  },
];
