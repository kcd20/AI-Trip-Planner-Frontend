import { SignedIn, SignedOut, UserButton } from '@clerk/clerk-react';
import AirplanemodeActiveIcon from '@mui/icons-material/AirplanemodeActive';
import MenuIcon from '@mui/icons-material/Menu';
import { IconButton, Menu, MenuItem } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { CSSProperties, FC, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';

import theme from '../config/theme';

const classes = {
  login: {
    display: 'block',
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  } as CSSProperties,
  loginMobile: {
    display: 'none',
    [theme.breakpoints.down('sm')]: {
      display: 'block',
    },
  } as CSSProperties,
} as const;

const NavbarComponent: FC = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const isOnLoginOrRegisterPage =
    pathname === '/login' || pathname === '/register';

  const onClickLandingPage = () => {
    navigate('/');
  };
  const onClickLogin = async () => {
    navigate('/login');
  };

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static">
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Box
          sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
          onClick={onClickLandingPage}
        >
          <AirplanemodeActiveIcon sx={{ padding: '1rem' }} />

          <Typography component="div" variant="h6" onClick={onClickLandingPage}>
            AI Japan Trip Planner
          </Typography>
        </Box>

        {!isOnLoginOrRegisterPage && (
          <>
            <Box sx={classes.login}>
              <SignedOut>
                <Button
                  color="inherit"
                  sx={{ textTransform: 'none' }}
                  onClick={onClickLogin}
                >
                  <Typography component="div" variant="h6">
                    Login / Register
                  </Typography>
                </Button>
              </SignedOut>
              <SignedIn>
                <UserButton />
              </SignedIn>
            </Box>
            <Box sx={classes.loginMobile}>
              <IconButton
                aria-label="menu"
                color="inherit"
                edge="start"
                size="large"
                onClick={handleClick}
              >
                <MenuIcon />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                id="basic-menu"
                open={open}
                onClose={handleClose}
              >
                <MenuItem
                  onClick={() => {
                    onClickLogin();
                    handleClose();
                  }}
                >
                  Login / Register
                </MenuItem>
              </Menu>
            </Box>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default NavbarComponent;
