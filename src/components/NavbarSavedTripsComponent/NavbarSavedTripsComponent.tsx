import { SignedIn } from '@clerk/clerk-react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { CSSProperties, FC } from 'react';

import theme from '../../config/theme';
import useNavbarComponentLogic from '../../hooks/useNavbarComponentLogic';

const classes = {
  root: {
    display: 'block',
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  } as CSSProperties,
  button: { textTransform: 'none' } as CSSProperties,
} as const;

const NavbarSavedTripsComponent: FC = () => {
  const { onClickSavedTrips } = useNavbarComponentLogic();
  return (
    <Box data-testid="NavbarSavedTripsComponent" sx={classes.root}>
      <SignedIn>
        <Button color="inherit" sx={classes.button}>
          <Typography component="div" variant="h6" onClick={onClickSavedTrips}>
            Saved Trips
          </Typography>
        </Button>
      </SignedIn>
    </Box>
  );
};

export default NavbarSavedTripsComponent;
