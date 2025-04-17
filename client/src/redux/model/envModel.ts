import { Action, action } from 'easy-peasy';

export interface EnvModel {
  env: { [key: string]: string } | null;
  setENV: Action<EnvModel, { [key: string]: string }>;
  clearENV: Action<EnvModel>;
}

const envModel: EnvModel = {
  env: null,
  setENV: action((state, payload) => {
    state.env = { ...(state.env || {}), ...payload };
  }),
  clearENV: action((state) => {
    state.env = null;
  }),
};

export default envModel;
