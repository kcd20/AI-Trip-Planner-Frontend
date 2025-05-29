import { useCallback, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

interface UseNavbarComponentLogicReturnInterface {
  isOnLoginOrRegisterPage: boolean;
  onClickLandingPage: () => void;
  onClickLogin: () => void;
  onClickSavedTrips: () => void;
  anchorEl: HTMLElement | null;
  open: boolean;
  handleClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  handleClose: () => void;
}

const useNavbarComponentLogic = (): UseNavbarComponentLogicReturnInterface => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const isOnLoginOrRegisterPage = useMemo(
    () => pathname === '/login' || pathname === '/register',
    [pathname]
  );

  const onClickLandingPage = useCallback(() => {
    navigate('/');
  }, [navigate]);

  const onClickSavedTrips = useCallback(() => {
    navigate('/trips');
  }, [navigate]);

  const onClickLogin = useCallback(() => {
    navigate('/login');
  }, [navigate]);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget);
    },
    []
  );
  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  return {
    isOnLoginOrRegisterPage,
    onClickLandingPage,
    onClickLogin,
    onClickSavedTrips,
    anchorEl,
    open,
    handleClick,
    handleClose,
  };
};

export default useNavbarComponentLogic;
