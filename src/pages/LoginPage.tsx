import { SignIn } from '@clerk/clerk-react';
import Box from '@mui/material/Box';
import { FC } from 'react';

const LoginPage: FC = () => {
  const savedTrip = sessionStorage.getItem('savedTrip');
  return (
    <Box
      sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
      }}
    >
      <SignIn
        forceRedirectUrl={savedTrip ? '/trips' : '/'}
        signUpUrl="/register"
      />
    </Box>
  );
};

export default LoginPage;
