import { SelfPromptingIterationType } from '@/types/modalTypes';

export const selfPromptingIteration: SelfPromptingIterationType = {
  isGenerating: false,
  iterationCount: 1,
  selectedIteration: 2,
  conversationId: null,
  lastGeneratedIteration: 0,
  apiCalled: false,
};
