import { AlertColor } from '@mui/material';
import { useSetAtom } from 'jotai';

import { openSnackbarAtom, snackbarAtom } from '../store/atoms';

const useSnackbar = (): {
  openSnackbar: ({
    description,
    severity,
  }: {
    description: string;
    severity: AlertColor;
  }) => void;
} => {
  const setOpenSnackbar = useSetAtom(openSnackbarAtom);
  const setSnackbar = useSetAtom(snackbarAtom);

  const openSnackbar = ({
    description,
    severity,
  }: {
    description: string;
    severity: AlertColor;
  }) => {
    setOpenSnackbar(true);
    setSnackbar({ description, severity });
  };

  return {
    openSnackbar,
  };
};

export default useSnackbar;
