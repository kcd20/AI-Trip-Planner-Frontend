import { useSetAtom } from 'jotai';

import { loaderAtom } from '../../store/atoms';
import LoaderVariant from '../../types/LoaderTypeInterface';

const useLoader = (
  variant: LoaderVariant
): {
  openLoader: () => void;
  closeLoader: () => void;
} => {
  const setLoaderState = useSetAtom(loaderAtom);

  const openLoader = () => {
    setLoaderState({ openLoader: true, variant });
  };

  const closeLoader = () => {
    setLoaderState({ openLoader: false, variant });
  };
  return {
    openLoader,
    closeLoader,
  };
};

export default useLoader;
