import { useContext } from 'react';

import { LoaderContext } from '../providers/LoaderProvider';

const useLoader = (): {
  openLoader: () => void;
  closeLoader: () => void;
} => {
  const loaderContext = useContext(LoaderContext);

  if (!loaderContext) {
    throw new Error(
      'Please use useLoader inside the context of LoaderProvider'
    );
  }

  return {
    openLoader: loaderContext.openLoader,
    closeLoader: loaderContext.closeLoader,
  };
};

export default useLoader;
