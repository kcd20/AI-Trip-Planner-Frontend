import { SignUp } from '@clerk/clerk-react';
import Box from '@mui/material/Box';
import { FC } from 'react';

const RegisterPage: FC = () => {
  return (
    <Box
      sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
      }}
    >
      <SignUp signInUrl="/login" />
    </Box>
  );
};

export default RegisterPage;
