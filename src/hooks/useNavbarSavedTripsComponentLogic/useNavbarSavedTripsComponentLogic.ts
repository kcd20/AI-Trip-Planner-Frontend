import { useAtomValue } from 'jotai';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import { disableActionsAtom } from '../../store/atoms';

interface UseNavbarSavedTripsComponentLogicReturnInterface {
  disabled: boolean;
  onClickSavedTrips: () => void;
}

const useNavbarSavedTripsComponentLogic =
  (): UseNavbarSavedTripsComponentLogicReturnInterface => {
    const navigate = useNavigate();
    const disabled = useAtomValue(disableActionsAtom);

    const onClickSavedTrips = useCallback(() => {
      navigate('/trips');
    }, [navigate]);

    return {
      disabled,
      onClickSavedTrips,
    };
  };

export default useNavbarSavedTripsComponentLogic;
