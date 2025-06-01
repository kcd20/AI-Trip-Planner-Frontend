import { useUser } from '@clerk/clerk-react';
import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';

interface UseNavbarComponentLogicReturnInterface {
  isSignedIn: boolean;
  isOnLoginOrRegisterPage: boolean;
}

const useNavbarComponentLogic = (): UseNavbarComponentLogicReturnInterface => {
  const { isSignedIn } = useUser();
  const { pathname } = useLocation();

  const isOnLoginOrRegisterPage = useMemo(
    () => pathname === '/login' || pathname === '/register',
    [pathname]
  );

  return {
    isSignedIn: isSignedIn || false,
    isOnLoginOrRegisterPage,
  };
};

export default useNavbarComponentLogic;
