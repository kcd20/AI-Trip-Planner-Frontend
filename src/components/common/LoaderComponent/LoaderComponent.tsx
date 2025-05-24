import Box from '@mui/system/Box';
import { CSSProperties, FC } from 'react';
import { TailSpin, Watch } from 'react-loader-spinner';

const classes = {
  loader: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  } as CSSProperties,
} as const;

interface LoaderComponentProps {
  openLoader: boolean;
  variant: 'spin' | 'watch';
}

const LoaderComponent: FC<LoaderComponentProps> = ({ openLoader, variant }) => {
  if (!openLoader) {
    return null;
  }
  return (
    <Box sx={classes.loader}>
      {variant === 'watch' && (
        <Watch
          visible
          ariaLabel="watch-loading"
          color="#1976d2"
          height="80"
          radius="48"
          width="80"
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
        />
      )}
    </Box>
  );
};

export default LoaderComponent;
