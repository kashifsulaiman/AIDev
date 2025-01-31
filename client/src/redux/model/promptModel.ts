import { Action, action } from 'easy-peasy';

export interface Prompt {
  id: number;
  title: string;
  description: string;
  template: string;
  apiKey: string;
  code: any;
  content: string;
  loader: boolean;
}

export interface PromptModel {
  prompt: Prompt | null;
  setPrompt: Action<PromptModel, Prompt>;
  clearPrompt: Action<PromptModel, Prompt>;
}

const initialPrompt: Prompt = {
  id: 0,
  title: '',
  description: '',
  template: '',
  apiKey: '',
  code: null,
  content: '',
  loader: false,
};

const promptModel: PromptModel = {
  prompt: initialPrompt,
  setPrompt: action((state, payload) => {
    state.prompt = { ...state.prompt, ...payload };
  }),
  clearPrompt: action((state) => {
    state.prompt = { ...initialPrompt, loader: false };
  }),
};

export default promptModel;
