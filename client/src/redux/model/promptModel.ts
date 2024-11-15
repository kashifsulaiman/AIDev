import { Action, action } from 'easy-peasy';

interface Prompt {
  id: number;
  title: string;
  description: string;
  template: string;
  apiKey: string;
}
export interface PromptModel {
  prompt: Prompt | null;
  setPrompt: Action<PromptModel, string[]>;
  getPrompt: Action<PromptModel, () => string[]>;
}
const promptModel: PromptModel = {
  prompt: null,
  setPrompt: action((state: any, payload: any) => {
    state.prompt = payload;
  }),
  getPrompt: action((state: any) => {
    return state.prompt;
  }),
};

export default promptModel;
