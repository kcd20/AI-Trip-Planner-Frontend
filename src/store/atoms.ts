import { AlertColor } from '@mui/material';
import { atom } from 'jotai';

export const disableFormAtom = atom(false);
export const disableActionsAtom = atom(false);

// Snackbar
export const openSnackbarAtom = atom(false);
export const snackbarAtom = atom({
  description: '',
  severity: 'error' as AlertColor,
});

// Loader
export const loaderAtom = atom<{
  openLoader: boolean;
  variant: 'spin' | 'watch';
}>({ openLoader: false, variant: 'spin' });

// Modal
export const openModalAtom = atom(false);
export const modalPropsAtom = atom<{
  description: string;
  actionText?: string;
  proceedAction: () => void;
}>({
  description: '',
  proceedAction: async () => {
    // default
  },
});
