import { useUser } from '@clerk/clerk-react';
import Box from '@mui/material/Box';
import { CSSProperties, FC } from 'react';
import { UseFormGetValues } from 'react-hook-form';

import theme from '../../config/theme';
import TripDetailsField from '../../fields/TripDetailsField';
import useTripDetailsComponentLogic from '../../hooks/useTripDetailsComponentLogic/useTripDetailsComponentLogic';
import TravelFormInterface from '../../types/TravelFormInterface';
import ButtonComponent from '../common/ButtonComponent/ButtonComponent';

const classes = {
  root: { display: 'grid', padding: '2rem', gap: '2rem' } as CSSProperties,
  buttonWrapper: {
    display: 'flex',
    justifyContent: 'end',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  } as CSSProperties,
} as const;

interface TripDetailsComponentProps {
  getMainFormValues: UseFormGetValues<TravelFormInterface>;
}

const TripDetailsComponent: FC<TripDetailsComponentProps> = ({
  getMainFormValues,
}) => {
  const { isSignedIn } = useUser();
  const { tripDetailsRef, saveTrip, loginAndSave } =
    useTripDetailsComponentLogic({
      getMainFormValues,
    });
  return (
    <Box sx={classes.root}>
      <Box ref={tripDetailsRef}>
        <TripDetailsField />
      </Box>
      {isSignedIn && (
        <Box sx={classes.buttonWrapper}>
          <ButtonComponent
            text="Save Trip Details"
            type="submit"
            variant="contained"
            onClick={saveTrip}
          />
        </Box>
      )}
      {!isSignedIn && (
        <Box sx={classes.buttonWrapper}>
          <ButtonComponent
            text="Log In to Save Trip Details"
            type="submit"
            variant="contained"
            onClick={loginAndSave}
          />
        </Box>
      )}
    </Box>
  );
};

export default TripDetailsComponent;
