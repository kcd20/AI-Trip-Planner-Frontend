import Box from '@mui/system/Box';
import { TailSpin, Watch } from 'react-loader-spinner';

type LoaderVariant = 'watch' | 'spin';

const LoaderComponent = ({
  variant,
}: {
  variant: LoaderVariant;
}): JSX.Element => {
  return (
    <Box
      sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
      }}
    >
      {variant === 'watch' && (
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
      )}
      {variant === 'spin' && (
        <TailSpin
          visible
          ariaLabel="tail-spin-loading"
          color="#1976d2"
          height="80"
          radius="1"
          width="80"
          wrapperClass=""
          wrapperStyle={{}}
        />
      )}
    </Box>
  );
};

export default LoaderComponent;
