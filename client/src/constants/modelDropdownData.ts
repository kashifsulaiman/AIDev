import { AIModelType } from '@/types/modalTypes';

export const AIModelData: AIModelType[] = [
  {
    provider: 'claude',
    reasoning: false,
    model: 'claude-3-7-sonnet-20250219',
    label: 'Claude 3.7 Sonnet (Normal)',
    img: '/asstes/images/claude-icon.png',
  },
  {
    provider: 'claude',
    reasoning: true,
    model: 'claude-3-7-sonnet-20250219',
    label: 'Claude 3.7 Sonnet (Thinking)',
    img: '/asstes/images/claude-icon.png',
  },
  {
    provider: 'openai',
    reasoning: true,
    model: 'o3-mini',
    label: 'Open AI o3-mini (Thinking)',
    img: '/asstes/images/openai-icon.png',
  },
  {
    provider: 'gemini',
    reasoning: true,
    model: 'gemini-2.5-pro-exp-03-25',
    label: 'Gemini 2.5 Pro exp (Thinking)',
    img: '/asstes/images/google-gemini-icon.png',
  },
];
