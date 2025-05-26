import { SignedIn, SignedOut, UserButton } from '@clerk/clerk-react';
import MenuIcon from '@mui/icons-material/Menu';
import { IconButton, Menu, MenuItem } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { CSSProperties, FC } from 'react';

import theme from '../../config/theme';
import useNavbarComponentLogic from '../../hooks/useNavbarComponentLogic';

const classes = {
  buttonText: { textTransform: 'none' } as CSSProperties,
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

const NavbarLoginComponent: FC = () => {
  const { onClickLogin, anchorEl, open, handleClick, handleClose } =
    useNavbarComponentLogic();

  return (
    <Box>
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
    </Box>
  );
};

export default NavbarLoginComponent;
