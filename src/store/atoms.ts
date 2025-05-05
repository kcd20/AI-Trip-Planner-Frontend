import { atom } from 'jotai';

export const disableActionsAtom = atom(false);

// Snackbar
export const snackbarAtom = atom(false);
export const snackbarPropsAtom = atom({
  textOne: '',
});

// Loader
export const loaderAtom = atom(false);

// Modal
export const openModalAtom = atom(false);
export const modalPropsAtom = atom({
  textOne: '',
  textTwo: '',
  proceedAction: () => undefined,
});
