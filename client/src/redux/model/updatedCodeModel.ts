import { Action, action } from 'easy-peasy';

interface updatedCode {
  id: number;
  code: string;
}
export interface UpdatedCodeModel {
  code: updatedCode | null;
  setUpdatedCode: Action<UpdatedCodeModel, string[]>;
  getUpdatedCode: Action<UpdatedCodeModel, () => string[]>;
}
const updatedCodeModel: UpdatedCodeModel = {
  code: null,
  setUpdatedCode: action((state: any, payload: any) => {
    state.code = payload;
  }),
  getUpdatedCode: action((state: any) => {
    return state.code;
  }),
};

export default updatedCodeModel;
