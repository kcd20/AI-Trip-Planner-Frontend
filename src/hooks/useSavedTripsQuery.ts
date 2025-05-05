import { useAuth } from '@clerk/clerk-react';
import { GetToken } from '@clerk/types';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import axios from 'axios';

import SavedTripsInterface from '../types/SavedTripsInterface';

const fetchUserTrips = async (
  getToken: GetToken
): Promise<SavedTripsInterface[]> => {
  const token = await getToken();
  const response = await axios.get<SavedTripsInterface[]>(
    `${import.meta.env.VITE_API_URL}/trip/saved`,
    {
      timeout: 10000,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

const useSavedTripsQuery = (): UseQueryResult<SavedTripsInterface[], Error> => {
  const { getToken } = useAuth();
  return useQuery({
    queryKey: ['savedTrips'],
    queryFn: () => fetchUserTrips(getToken),
  });
};

export default useSavedTripsQuery;
