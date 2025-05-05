import React from 'react';
import { Outlet } from 'react-router';

import ModalComponent from './components/common/ModalComponent';
import NavbarComponent from './components/NavbarComponent';

const App = (): React.ReactNode => {
  return (
    <>
      <ModalComponent />
      <NavbarComponent />
      <Outlet />
    </>
  );
};

export default App;
