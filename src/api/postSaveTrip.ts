import axios from 'axios';

interface postSaveTripReqInterface {
  destinations: string[];
  lengthOfTrip: string;
  arrivalAirport?: string;
  departureAirport?: string;
  timeOfArrival?: string;
  timeOfDeparture?: string;
  tripDetails: string;
}

const postSaveTrip = async (
  postSaveTripReq: postSaveTripReqInterface,
  token: string | null
): Promise<string> => {
  const { data } = await axios.post(
    `${import.meta.env.VITE_API_URL}/generate`,
    postSaveTripReq,
    {
      timeout: 10000,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return data;
};

export default postSaveTrip;
