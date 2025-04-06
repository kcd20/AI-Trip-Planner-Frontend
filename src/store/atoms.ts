import { atom } from 'jotai';

export const disableActionsAtom = atom(false);
export const openModalAtom = atom(false);
export const modalPropsAtom = atom({
  textOne: '',
  textTwo: '',
  proceedAction: () => undefined,
});
