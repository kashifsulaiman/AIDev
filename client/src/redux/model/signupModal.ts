import { SignupModelType } from '@/types/modalTypes';
import { Action, action } from 'easy-peasy';

export interface SignupModel {
  signupObj: SignupModelType;
  add: Action<SignupModel, SignupModelType>;
}

const signupObj: SignupModel = {
  signupObj: { form: 'signup', email: '' },
  add: action((state, payload: SignupModelType) => {
    state.signupObj = payload;
  }),
};

export default signupObj;
