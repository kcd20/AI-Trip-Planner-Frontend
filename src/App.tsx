import { useAtom, useAtomValue } from 'jotai';
import { ReactNode, useCallback } from 'react';
import { Outlet } from 'react-router-dom';

import LoaderComponent from './components/common/LoaderComponent/LoaderComponent';
import ModalComponent from './components/common/ModalComponent/ModalComponent';
import SnackbarComponent from './components/common/SnackbarComponent/SnackbarComponent';
import NavbarComponent from './components/NavbarComponent';
import {
  loaderAtom,
  modalPropsAtom,
  openModalAtom,
  openSnackbarAtom,
  snackbarAtom,
} from './store/atoms';

const App = (): ReactNode => {
  const [openSnackbar, setOpenSnackbar] = useAtom(openSnackbarAtom);
  const { description: snackbarDescription, severity } =
    useAtomValue(snackbarAtom);
  const onCloseSnackbar = useCallback(() => {
    setOpenSnackbar(false);
  }, [setOpenSnackbar]);

  const [openModal, setOpenModal] = useAtom(openModalAtom);
  const modalProps = useAtomValue(modalPropsAtom);
  const {
    description: modalDescription,
    actionText,
    proceedAction,
  } = modalProps;
  const closeModal = useCallback(() => {
    setOpenModal(false);
  }, [setOpenModal]);

  const { openLoader, variant } = useAtomValue(loaderAtom);

  return (
    <>
      <NavbarComponent />
      <ModalComponent
        actionText={actionText}
        closeModal={closeModal}
        description={modalDescription}
        openModal={openModal}
        proceedAction={proceedAction}
      />
      <LoaderComponent openLoader={openLoader} variant={variant} />
      <SnackbarComponent
        description={snackbarDescription}
        openSnackbar={openSnackbar}
        severity={severity}
        onClose={onCloseSnackbar}
      />
      <Outlet />
    </>
  );
};

export default App;
