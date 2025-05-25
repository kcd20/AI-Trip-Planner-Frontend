import { SignUp } from '@clerk/clerk-react';
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

const RegisterPage: FC = () => {
  return (
    <Box sx={classes.root}>
      <SignUp signInUrl="/login" />
    </Box>
  );
};

export default RegisterPage;
