import { SignedIn } from '@clerk/clerk-react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { CSSProperties, FC } from 'react';

import useNavbarComponentLogic from '../../hooks/useNavbarComponentLogic';

const classes = {
  root: { textTransform: 'none' } as CSSProperties,
} as const;

const NavbarSavedTripsComponent: FC = () => {
  const { onClickSavedTrips } = useNavbarComponentLogic();
  return (
    <Box>
      <SignedIn>
        <Button color="inherit" sx={classes.root}>
          <Typography component="div" variant="h6" onClick={onClickSavedTrips}>
            Saved Trips
          </Typography>
        </Button>
      </SignedIn>
    </Box>
  );
};

export default NavbarSavedTripsComponent;
