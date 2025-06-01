import { useUser } from '@clerk/clerk-react';
import { useSetAtom } from 'jotai';
import { useCallback, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { disableFormAtom, tripDetailsAtom } from '../../store/atoms';

interface UseNavbarComponentLogicReturnInterface {
  isSignedIn: boolean;
  isOnLoginOrRegisterPage: boolean;
  onClickLandingPage: () => void;
}

const useNavbarComponentLogic = (): UseNavbarComponentLogicReturnInterface => {
  const { isSignedIn } = useUser();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const setTripDetails = useSetAtom(tripDetailsAtom);
  const setDisableForm = useSetAtom(disableFormAtom);

  const isOnLoginOrRegisterPage = useMemo(
    () => pathname === '/login' || pathname === '/register',
    [pathname]
  );

  const onClickLandingPage = useCallback(() => {
    sessionStorage.removeItem('savedTrip');
    setDisableForm(false);
    setTripDetails('');
    navigate('/');
  }, [navigate, setDisableForm, setTripDetails]);

  return {
    isSignedIn: isSignedIn || false,
    isOnLoginOrRegisterPage,
    onClickLandingPage,
  };
};

export default useNavbarComponentLogic;
