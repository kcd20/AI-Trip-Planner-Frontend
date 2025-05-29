import { SignedIn, SignedOut, useClerk, UserButton } from '@clerk/clerk-react';
import MenuIcon from '@mui/icons-material/Menu';
import { IconButton, Menu, MenuItem } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { CSSProperties, FC } from 'react';

import theme from '../../config/theme';
import useNavbarComponentLogic from '../../hooks/useNavbarComponentLogic/useNavbarComponentLogic';

const classes = {
  buttonText: { textTransform: 'none' } as CSSProperties,
  menuText: { margin: 'auto' } as CSSProperties,
  login: {
    display: 'flex',
    alignItems: 'center',
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

const NavbarLoginComponent: FC = () => {
  const {
    onClickLogin,
    onClickSavedTrips,
    anchorEl,
    open,
    handleClick,
    handleClose,
  } = useNavbarComponentLogic();
  const { signOut } = useClerk();
  return (
    <Box data-testid="NavbarLoginComponent">
      <Box sx={classes.login}>
        <SignedOut>
          <Button
            color="inherit"
            sx={classes.buttonText}
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
          datatest-id="MenuButton"
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
          <SignedOut>
            <MenuItem
              onClick={() => {
                onClickLogin();
                handleClose();
              }}
            >
              Login / Register
            </MenuItem>
          </SignedOut>
          <SignedIn>
            <MenuItem
              onClick={() => {
                onClickSavedTrips();
                handleClose();
              }}
            >
              <Typography
                sx={classes.menuText}
                variant="h6"
                onClick={onClickSavedTrips}
              >
                Saved Trips
              </Typography>
            </MenuItem>
            <hr />
            <MenuItem onClick={() => signOut()}>
              <Typography
                sx={classes.menuText}
                variant="h6"
                onClick={onClickSavedTrips}
              >
                Sign Out
              </Typography>
            </MenuItem>
          </SignedIn>
        </Menu>
      </Box>
    </Box>
  );
};

export default NavbarLoginComponent;
