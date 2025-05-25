import { SignIn } from '@clerk/clerk-react';
import Box from '@mui/material/Box';
import { CSSProperties, FC } from 'react';

const classes = {
  root: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  } as CSSProperties,
} as const;

const LoginPage: FC = () => {
  const savedTrip = sessionStorage.getItem('savedTrip');
  return (
    <Box sx={classes.root}>
      <SignIn
        forceRedirectUrl={savedTrip ? '/trips' : '/'}
        signUpUrl="/register"
      />
    </Box>
  );
};

export default LoginPage;
