import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { CSSProperties, FC } from 'react';

import theme from '../../config/theme';
import useNavbarSavedTripsComponentLogic from '../../hooks/useNavbarSavedTripsComponentLogic/useNavbarSavedTripsComponentLogic';

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
  const { disabled, onClickSavedTrips } = useNavbarSavedTripsComponentLogic();
  return (
    <Box data-testid="NavbarSavedTripsComponent" sx={classes.root}>
      <Button color="inherit" disabled={disabled} sx={classes.button}>
        <Typography variant="h6" onClick={onClickSavedTrips}>
          Saved Trips
        </Typography>
      </Button>
    </Box>
  );
};

export default NavbarSavedTripsComponent;
