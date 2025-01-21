import { UpdatedCodeModel } from '@/types/modalTypes';
import { action } from 'easy-peasy';

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
