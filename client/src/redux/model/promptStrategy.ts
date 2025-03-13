import { PromptingStrategyData } from '@/constants/PromptStrategyData';
import { PromptingStrategyType } from '@/types/modalTypes';
import { Action, action } from 'easy-peasy';

export interface PromptingStrategyModel {
  strategy: PromptingStrategyType;
  setStrategy: Action<PromptingStrategyModel, PromptingStrategyType>;
}

const promptingStrategyModel: PromptingStrategyModel = {
  strategy: PromptingStrategyData[0],
  setStrategy: action((state, payload) => {
    state.strategy = { ...state.strategy, ...payload };
  }),
};

export default promptingStrategyModel;
