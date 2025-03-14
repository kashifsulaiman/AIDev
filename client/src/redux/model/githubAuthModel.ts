import { GithubAuthModelType } from '@/types/modalTypes';
import { Action, action } from 'easy-peasy';

export interface GithubAuthModel {
  githubModel: GithubAuthModelType;
  setGithubModel: Action<GithubAuthModel, GithubAuthModelType>;
}

const githubAuthModel: GithubAuthModel = {
  githubModel: { token: null, username: null },
  setGithubModel: action((state, payload) => {
    state.githubModel = { ...state.githubModel, ...payload };
  }),
};

export default githubAuthModel;
