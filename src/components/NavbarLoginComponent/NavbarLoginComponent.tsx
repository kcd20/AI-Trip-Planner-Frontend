import { UserButton } from '@clerk/clerk-react';
import MenuIcon from '@mui/icons-material/Menu';
import { IconButton, Menu, MenuItem } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { CSSProperties, FC } from 'react';

import theme from '../../config/theme';
import useNavbarLoginComponentLogic from '../../hooks/useNavbarLoginComponentLogic/useNavbarLoginComponentLogic';

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
    signOut,
    disabled,
    isSignedIn,
  } = useNavbarLoginComponentLogic();

  return (
    <Box data-testid="NavbarLoginComponent">
      <Box sx={classes.login}>
        {isSignedIn ? (
          <UserButton />
        ) : (
          <Button
            color="inherit"
            disabled={disabled}
            sx={classes.buttonText}
            onClick={onClickLogin}
          >
            <Typography component="div" variant="h6">
              Login / Register
            </Typography>
          </Button>
        )}
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
          {isSignedIn ? (
            <>
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
            </>
          ) : (
            <MenuItem
              onClick={() => {
                onClickLogin();
                handleClose();
              }}
            >
              Login / Register
            </MenuItem>
          )}
        </Menu>
      </Box>
    </Box>
  );
};

export default NavbarLoginComponent;
