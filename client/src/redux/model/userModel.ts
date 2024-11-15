import { Action, action } from 'easy-peasy';

import { UserModelTypes } from '@/types/modalTypes';

export interface UserModel {
  UserObj: any;
  add: Action<UserModel, UserModelTypes>;
}

const userObj: UserModel = {
  UserObj: {},
  add: action((state, payload: UserModelTypes) => {
    state.UserObj = payload;
  }),
};

export default userObj;
