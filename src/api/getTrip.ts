import axios from 'axios';

import FullTravelFormInterface from '../types/FullTravelFormInterface';

const getTrip = async (
  state: string,
  token: string | null
): Promise<FullTravelFormInterface> => {
  const { data } = await axios.get(
    `${import.meta.env.VITE_API_URL}/trip/get/${state}`,
    {
      timeout: 60000,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return data;
};

export default getTrip;
