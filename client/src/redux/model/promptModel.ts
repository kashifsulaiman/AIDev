import { Action, action } from 'easy-peasy';

export interface Prompt {
  id: number;
  title: string;
  description: string;
  template: string;
  apiKey: string;
  code: string;
  question: string;
}
export interface PromptModel {
  prompt: Prompt | null;
  setPrompt: Action<PromptModel, Prompt>;
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
