import { atom, atomFamily } from 'recoil';

export const atoms = {
  IS_BACK_DROP: atom<boolean>({
    key: 'is_back_drop',
    default: false,
  }),
};

export const atomFamilys = {};
