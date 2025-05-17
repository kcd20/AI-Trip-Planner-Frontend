import axios from 'axios';

import SavedTripsInterface from '../types/SavedTripsInterface';

const getSavedTrips = async (
  token: string | null
): Promise<SavedTripsInterface[]> => {
  const { data } = await axios.get<SavedTripsInterface[]>(
    `${import.meta.env.VITE_API_URL}/trip/saved`,
    {
      timeout: 10000,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return data;
};

export default getSavedTrips;
