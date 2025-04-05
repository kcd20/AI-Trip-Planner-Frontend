import Box from '@mui/material/Box';
import React from 'react';
import { Outlet } from 'react-router';

import NavbarComponent from './components/NavbarComponent';

const App = (): React.ReactNode => {
  return (
    <Box>
      <NavbarComponent />
      <Outlet />
    </Box>
  );
};

export default App;
