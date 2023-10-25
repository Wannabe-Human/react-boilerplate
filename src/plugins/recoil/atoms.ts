import { atom, atomFamily } from 'recoil';

export const atoms = {
  IS_BACK_DROP: atom<boolean>({
    key: 'is_back_drop',
    default: false,
  }),
  ALERT_DIALOG_STATE: atom<{ [name: string]: any }>({
    key: 'alert_dialog_state',
    default: {},
  }),
};

export const atomFamilys = {};
