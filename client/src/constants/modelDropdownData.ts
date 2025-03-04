import { AIModelType } from '@/types/modalTypes';

export const AIModelData: AIModelType[] = [
  {
    value: 'claude-normal',
    label: 'Claude 3.7 Sonnet (Normal)',
    img: '/asstes/images/claude-icon.png',
  },
  {
    value: 'claude-reasoning',
    label: 'Claude 3.7 Sonnet (Thinking)',
    img: '/asstes/images/claude-icon.png',
  },
  {
    value: 'openai-reasoning',
    label: 'Open AI o3-mini (Thinking)',
    img: '/asstes/images/openai-icon.png',
  },
];
