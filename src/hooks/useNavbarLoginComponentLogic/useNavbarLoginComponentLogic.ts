import { useClerk, useUser } from '@clerk/clerk-react';
import { useAtomValue } from 'jotai';
import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { disableActionsAtom } from '../../store/atoms';

interface useNavbarLoginComponentLogicReturnInterface {
  onClickLogin: () => void;
  onClickSavedTrips: () => void;
  anchorEl: HTMLElement | null;
  open: boolean;
  handleClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  handleClose: () => void;
  signOut: () => void;
  disabled: boolean;
  isSignedIn: boolean;
}
const useNavbarLoginComponentLogic =
  (): useNavbarLoginComponentLogicReturnInterface => {
    const navigate = useNavigate();
    const { signOut } = useClerk();
    const disabled = useAtomValue(disableActionsAtom);
    const { isSignedIn } = useUser();

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
      onClickLogin,
      onClickSavedTrips,
      anchorEl,
      open,
      handleClick,
      handleClose,
      signOut,
      disabled,
      isSignedIn: isSignedIn || false,
    };
  };

export default useNavbarLoginComponentLogic;
