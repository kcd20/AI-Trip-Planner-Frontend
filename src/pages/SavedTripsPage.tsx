import Box from '@mui/material/Box';
import { FC } from 'react';

import SavedTripsComponent from '../components/SavedTripsComponent';

const SavedTripsPage: FC = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <SavedTripsComponent />
    </Box>
  );
};

export default SavedTripsPage;
