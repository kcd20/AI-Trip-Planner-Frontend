import { SignedIn, SignedOut, UserButton } from '@clerk/clerk-react';
import AirplanemodeActiveIcon from '@mui/icons-material/AirplanemodeActive';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { FC } from 'react';
import { useLocation, useNavigate } from 'react-router';

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

  return (
    <Box>
      <AppBar position="static">
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box
            sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
            onClick={onClickLandingPage}
          >
            <AirplanemodeActiveIcon sx={{ padding: '1rem' }} />

            <Typography
              component="div"
              variant="h6"
              onClick={onClickLandingPage}
            >
              AI Trip Planner
            </Typography>
          </Box>

          {!isOnLoginOrRegisterPage && (
            <>
              <SignedOut>
                <Button
                  color="inherit"
                  sx={{ textTransform: 'none' }}
                  onClick={() => onClickLogin()}
                >
                  <Typography component="div" variant="h6">
                    Login / Register
                  </Typography>
                </Button>
              </SignedOut>
              <SignedIn>
                <UserButton />
              </SignedIn>
            </>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default NavbarComponent;
