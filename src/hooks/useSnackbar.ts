import { useContext } from 'react';

import { SnackbarContext } from '../providers/SnackbarProvider';

const useSnackbar = (): {
  openSnackbar: () => void;
} => {
  const snackbarContext = useContext(SnackbarContext);

  if (!snackbarContext) {
    throw new Error(
      'Please use useLoader inside the context of SnackbarProvider'
    );
  }

  return {
    openSnackbar: snackbarContext.openSnackbar,
  };
};

export default useSnackbar;
