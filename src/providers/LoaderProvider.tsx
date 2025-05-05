import {
  createContext,
  FC,
  PropsWithChildren,
  useEffect,
  useMemo,
  useState,
} from 'react';

import LoaderComponent from '../components/common/LoaderComponent';

export type LoaderContextProps = {
  showLoader: boolean;
  openLoader: () => void;
  closeLoader: () => void;
};

export const LoaderContext = createContext<LoaderContextProps>(
  {} as LoaderContextProps
);

export const LoaderProvider: FC<PropsWithChildren> = ({ children }) => {
  const [showLoader, setShowLoader] = useState<boolean>(false);
  const [loaderStack, setLoaderStack] = useState<Array<boolean>>([]);

  const contextValue = useMemo(() => {
    return {
      showLoader,
      openLoader: () => {
        setLoaderStack([...loaderStack, true]);
      },
      closeLoader: () => {
        setLoaderStack([...loaderStack.slice(1)]);
      },
    };
  }, [loaderStack, showLoader]);

  useEffect(() => {
    if (!loaderStack.length) {
      setShowLoader(false);
      return;
    }
    setShowLoader(true);
  }, [loaderStack]);

  return (
    <LoaderContext.Provider value={contextValue}>
      {showLoader && <LoaderComponent variant="watch" />}
      {children}
    </LoaderContext.Provider>
  );
};
