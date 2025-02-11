import { Project } from '@stackblitz/sdk';
import { Action, action } from 'easy-peasy';

export interface Prompt {
  id: number;
  title: string;
  description: string;
  template: string;
  apiKey: string;
  code: Project | null;
  content: string;
  loader: boolean;
  question:string | null;
}

export interface PromptModel {
  prompt: Prompt | null;
  setPrompt: Action<PromptModel, Partial<Prompt>>;
  clearPrompt: Action<PromptModel, void>;
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
  question: ''
};

const promptModel: PromptModel = {
  prompt: initialPrompt,
  setPrompt: action((state, payload) => {
    state.prompt = { ...state.prompt, ...payload } as Prompt;
  }),
  clearPrompt: action((state) => {
    state.prompt = initialPrompt;
  }),
};

export default promptModel;
