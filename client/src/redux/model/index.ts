import { persist } from 'easy-peasy';

import userObj, { UserModel } from './userModel';
import signupObj, { SignupModel } from './signupModal';
import forgotPasswordObj, { ForgotPasswordModel } from './forgotPasswodModal';
import promptModel, { PromptModel } from './promptModel';
import conversationModel, { ConversationModel } from './conversationModel';
import aiModel, { AIModel } from './aiModel';
import promptingStrategyModel, {
  PromptingStrategyModel,
} from './promptStrategy';
import githubAuthModel, { GithubAuthModel } from './githubAuthModel';
import selfPromptingModel, { SelfPromptingModel } from './selfPromptingModel';
import envModel, { EnvModel } from './envModel';
export interface StoreModel {
  userObj: UserModel;
  signupObj: SignupModel;
  forgotPasswordObj: ForgotPasswordModel;
  promptModel: PromptModel;
  conversationModel: ConversationModel;
  aiModel: AIModel;
  promptingStrategyModel: PromptingStrategyModel;
  githubAuthModel: GithubAuthModel;
  selfPromptingModel: SelfPromptingModel;
  envModel: EnvModel
}
const model: StoreModel = persist(
  {
    userObj,
    signupObj,
    forgotPasswordObj,
    promptModel,
    conversationModel,
    aiModel,
    promptingStrategyModel,
    githubAuthModel,
    selfPromptingModel,
    envModel
  },
  {
    storage: 'localStorage',
  }
);

export default model;
