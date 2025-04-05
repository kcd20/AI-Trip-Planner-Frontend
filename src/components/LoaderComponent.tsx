import Box from '@mui/system/Box';
import { Watch } from 'react-loader-spinner';

const LoaderComponent = (): JSX.Element => {
  return (
    <Box
      sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
      }}
    >
      <Watch
        visible
        ariaLabel="watch-loading"
        color="#1976d2"
        height="80"
        radius="48"
        width="80"
        wrapperClass=""
        wrapperStyle={{}}
      />
    </Box>
  );
};

export default LoaderComponent;
