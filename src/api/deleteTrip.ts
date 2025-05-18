import axios from 'axios';

const deleteTrip = async (id: string, token: string | null): Promise<void> => {
  await axios.delete(`${import.meta.env.VITE_API_URL}/trip/${id}`, {
    timeout: 10000,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export default deleteTrip;
