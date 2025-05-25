import Box from '@mui/material/Box';
import { CSSProperties, FC } from 'react';

import SavedTripsComponent from '../../components/SavedTripsComponent';

const classes = {
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  } as CSSProperties,
} as const;

const SavedTripsPage: FC = () => {
  return (
    <Box sx={classes.root}>
      <SavedTripsComponent />
    </Box>
  );
};

export default SavedTripsPage;
