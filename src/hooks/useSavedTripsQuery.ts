import { useAuth } from '@clerk/clerk-react';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router';

import getSavedTrips from '../api/getSavedTrips';
import postSaveTrip from '../api/postSaveTrip';
import { TIME_DISPLAY_FORMAT } from '../constants';
import FullTravelFormInterface from '../types/FullTravelFormInterface';
import SavedTripsInterface from '../types/SavedTripsInterface';

const useSavedTripsQuery = (): UseQueryResult<SavedTripsInterface[], Error> => {
  const { getToken } = useAuth();
  const navigate = useNavigate();
  return useQuery({
    queryKey: ['savedTrips'],
    queryFn: async () => {
      const savedTrip = sessionStorage.getItem('savedTrip');
      const token = await getToken();
      if (savedTrip !== null) {
        try {
          const savedTripObj: FullTravelFormInterface = JSON.parse(savedTrip);
          const {
            destinations,
            lengthOfTrip,
            arrivalAirport,
            departureAirport,
            timeOfArrival,
            timeOfDeparture,
            tripDetails,
          } = savedTripObj;
          await postSaveTrip(
            {
              destinations,
              lengthOfTrip,
              arrivalAirport: arrivalAirport ?? undefined,
              departureAirport: departureAirport ?? undefined,
              timeOfArrival: timeOfArrival
                ? dayjs(timeOfArrival).format(TIME_DISPLAY_FORMAT)
                : undefined,
              timeOfDeparture: timeOfDeparture
                ? dayjs(timeOfDeparture).format(TIME_DISPLAY_FORMAT)
                : undefined,
              tripDetails,
            },
            token
          );
          sessionStorage.removeItem('savedTrip');
        } catch {
          navigate('/');
        }
      }
      const data = await getSavedTrips(token);
      return data;
    },
  });
};

export default useSavedTripsQuery;
