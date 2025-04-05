import Box from '@mui/material/Box';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
} from 'firebase/auth';
import { FC } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';

import ButtonComponent from '../components/ButtonComponent';
import { auth, googleProvider } from '../config/firebase';
import { LOGIN_FORM_DEFAULT_VALUES } from '../constants';
import EmailField from '../fields/EmailField';
import PasswordField from '../fields/PasswordField';
import LoginFormInterface from '../types/LoginFormInterface';

const LoginPage: FC = () => {
  const navigate = useNavigate();
  const methods = useForm<LoginFormInterface>({
    mode: 'all',
    shouldUnregister: true,
    defaultValues: LOGIN_FORM_DEFAULT_VALUES,
  });
  const { getValues } = methods;

  const createUser = async () => {
    const email = getValues('email');
    const password = getValues('password');
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate('/');
    } catch (error) {
      window.console.log(error);
    }
  };

  const signIn = async () => {
    const email = getValues('email');
    const password = getValues('password');
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/');
    } catch (error) {
      window.console.log(error);
    }
  };

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      navigate('/');
    } catch (error) {
      window.console.log(error);
    }
  };

  return (
    <Box>
      <FormProvider {...methods}>
        <EmailField />
        <PasswordField />
        <ButtonComponent
          text="Create an Account"
          variant="contained"
          onClick={createUser}
        />
        <ButtonComponent text="Login" variant="contained" onClick={signIn} />
        <ButtonComponent
          text="Login with Google"
          variant="contained"
          onClick={signInWithGoogle}
        />
      </FormProvider>
    </Box>
  );
};

export default LoginPage;
