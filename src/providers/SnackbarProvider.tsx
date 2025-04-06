import { createContext, FC, PropsWithChildren, useMemo, useState } from 'react';

import SnackbarComponent from '../components/SnackbarComponent';

export type SnackbarContextProps = {
  openSnackbar: () => void;
};

export const SnackbarContext = createContext<SnackbarContextProps>(
  {} as SnackbarContextProps
);

export const SnackbarProvider: FC<PropsWithChildren> = ({ children }) => {
  const [showSnackbar, setShowSnackbar] = useState<boolean>(false);

  const contextValue = useMemo(() => {
    return {
      openSnackbar: () => {
        setShowSnackbar(true);
      },
    };
  }, []);

  return (
    <SnackbarContext.Provider value={contextValue}>
      {showSnackbar && (
        <SnackbarComponent
          open={showSnackbar}
          onClose={() => setShowSnackbar(false)}
        />
      )}
      {children}
    </SnackbarContext.Provider>
  );
};
