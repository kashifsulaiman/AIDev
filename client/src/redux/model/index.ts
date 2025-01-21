import { persist } from 'easy-peasy';

import userObj, { UserModel } from './userModel';
import signupObj, { SignupModel } from './signupModal';
import forgotPasswordObj, { ForgotPasswordModel } from './forgotPasswodModal';
import promptModel, { PromptModel } from './promptModel';
import updatedCodeModel from './updatedCodeModel';
import { UpdatedCodeModel } from '@/types/modalTypes';
export interface StoreModel {
  userObj: UserModel;
  signupObj: SignupModel;
  forgotPasswordObj: ForgotPasswordModel;
  promptModel: PromptModel;
  updatedCodeModel: UpdatedCodeModel;
}
const model: StoreModel = persist(
  {
    userObj,
    signupObj,
    forgotPasswordObj,
    promptModel,
    updatedCodeModel,
  },
  {
    storage: 'localStorage',
  }
);

export default model;
