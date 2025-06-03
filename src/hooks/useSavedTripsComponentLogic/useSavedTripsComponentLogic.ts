import { useAuth } from '@clerk/clerk-react';
import { useQueryClient } from '@tanstack/react-query';
import { useSetAtom } from 'jotai';

import deleteTrip from '../../api/deleteTrip';
import { modalPropsAtom, openModalAtom } from '../../store/atoms';

interface UseSavedTripsComponentLogicReturnInterface {
  onClickDelete: (id: string) => void;
}

const useSavedTripsComponentLogic =
  (): UseSavedTripsComponentLogicReturnInterface => {
    const { getToken } = useAuth();
    const queryClient = useQueryClient();
    const setOpenModal = useSetAtom(openModalAtom);
    const setModalProps = useSetAtom(modalPropsAtom);

    const onClickDelete = (id: string) => {
      setModalProps({
        description: 'Are you sure you want to delete this trip?',
        proceedAction: async () => {
          const token = await getToken();
          await deleteTrip(id, token);
          await queryClient.invalidateQueries({ queryKey: ['savedTrips'] });
          setOpenModal(false);
        },
      });
      setOpenModal(true);
    };

    return {
      onClickDelete,
    };
  };

export default useSavedTripsComponentLogic;
