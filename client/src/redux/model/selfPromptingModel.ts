
import { Action, action } from 'easy-peasy';
import { SelfPromptingIterationType } from '@/types/modalTypes';
import { selfPromptingIteration } from '@/constants/selfPromptingData';

export interface SelfPromptingModel {
  selfPromptingIteration: SelfPromptingIterationType
  setGenerating: Action<SelfPromptingModel, boolean>;
  setIterationCount: Action<SelfPromptingModel, number>;
  setConversationId: Action<SelfPromptingModel, string | null>;
  setLastGeneratedIteration: Action<SelfPromptingModel, number>;
  setSelectedIteration:  Action<SelfPromptingModel, number>
  clearSelfPromptingIteration: Action<SelfPromptingModel>
  setIsOldApiCalled: Action<SelfPromptingModel, boolean>;
}

const selfPromptingModel: SelfPromptingModel = {
  selfPromptingIteration: selfPromptingIteration,
  setGenerating: action((state, payload) => {
    state.selfPromptingIteration.isGenerating = payload;
  }),
  setIterationCount: action((state, payload) => {
    state.selfPromptingIteration.iterationCount = payload;
  }),
  setSelectedIteration: action((state, payload) => {
    state.selfPromptingIteration.selectedIteration = payload;
  }),
  setConversationId: action((state, payload) => {
    state.selfPromptingIteration.conversationId = payload;
  }),
  setLastGeneratedIteration: action((state, payload) => {
    state.selfPromptingIteration.lastGeneratedIteration = payload;
  }),
  clearSelfPromptingIteration: action((state) => {
    state.selfPromptingIteration = selfPromptingIteration;  
  }),
  setIsOldApiCalled: action((state, payload) => {
    state.selfPromptingIteration.isOldApiCalled = payload;  
  })
};

export default selfPromptingModel;