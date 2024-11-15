import { ForgotPasswordModelType } from '@/types/modalTypes';
import { Action, action } from 'easy-peasy';

export interface ForgotPasswordModel {
  forgotPasswordObj: ForgotPasswordModelType;
  add: Action<ForgotPasswordModel, ForgotPasswordModelType>;
}

const forgotPasswordObj: ForgotPasswordModel = {
  forgotPasswordObj: { form: 'forgotPassword', email: '' },
  add: action((state, payload: ForgotPasswordModelType) => {
    state.forgotPasswordObj = payload;
  }),
};

export default forgotPasswordObj;
