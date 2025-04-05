import AirplanemodeActiveIcon from '@mui/icons-material/AirplanemodeActive';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { FC, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router';

import { auth } from '../config/firebase';

const NavbarComponent: FC = () => {
  const navigate = useNavigate();
  const onClickLogin = async (isUserLoggedIn: boolean | null) => {
    if (isUserLoggedIn === null) {
      return;
    }
    if (!isUserLoggedIn) {
      navigate('/login');
      return;
    }
    try {
      await signOut(auth);
      navigate('/');
    } catch (error) {
      window.console.log(error);
    }
  };
  const [isUserLoggedIn, setIsUserLoggedIn] = useState<boolean | null>(null);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsUserLoggedIn(true);
        return;
      }
      setIsUserLoggedIn(false);
    });
  }, []);

  const renderLoginText = useMemo(() => {
    switch (isUserLoggedIn) {
      case true:
        return 'Logout';
      case false:
        return 'Login';
      default:
        return null;
    }
  }, [isUserLoggedIn]);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <AirplanemodeActiveIcon sx={{ padding: '1rem' }} />
          <Typography component="div" sx={{ flexGrow: 1 }} variant="h6">
            AI Trip Planner
          </Typography>
          <Button
            color="inherit"
            sx={{ textTransform: 'none' }}
            onClick={() => onClickLogin(isUserLoggedIn)}
          >
            <Typography component="div" variant="h6">
              {renderLoginText}
            </Typography>
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default NavbarComponent;
