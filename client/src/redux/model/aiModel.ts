import { AIModelData } from '@/constants/modelDropdownData';
import { AIModelType } from '@/types/modalTypes';
import { Action, action } from 'easy-peasy';

export interface AIModel {
  model: AIModelType;
  setModel: Action<AIModel, AIModelType>;
}

const aiModel: AIModel = {
  model: AIModelData[2],
  setModel: action((state, payload) => {
    state.model = { ...state.model, ...payload };
  }),
};

export default aiModel;
