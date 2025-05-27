import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { CSSProperties, FC } from 'react';

import useNavbarComponentLogic from '../../hooks/useNavbarComponentLogic';
import NavbarLoginComponent from '../NavbarLoginComponent/NavbarLoginComponent';
import NavbarSavedTripsComponent from '../NavbarSavedTripsComponent/NavbarSavedTripsComponent';
import NavbarTitleComponent from '../NavbarTitleComponent/NavbarTitleComponent';

const classes = {
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
  } as CSSProperties,
  rightContent: {
    display: 'flex',
    alignItems: 'center',
    gap: '2rem',
  } as CSSProperties,
} as const;

const NavbarComponent: FC = () => {
  const { isOnLoginOrRegisterPage } = useNavbarComponentLogic();
  return (
    <AppBar position="static">
      <Toolbar sx={classes.toolbar}>
        <NavbarTitleComponent />

        <Box sx={classes.rightContent}>
          <NavbarSavedTripsComponent />
          {!isOnLoginOrRegisterPage && <NavbarLoginComponent />}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavbarComponent;
