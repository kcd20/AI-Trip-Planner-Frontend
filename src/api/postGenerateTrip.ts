import axios from 'axios';

interface postGenerateTripReqInterface {
  destinations: string[];
  lengthOfTrip: string;
  arrivalAirport?: string;
  departureAirport?: string;
  timeOfArrival?: string;
  timeOfDeparture?: string;
}

const postGenerateTrip = async (
  postGenerateTripReq: postGenerateTripReqInterface
): Promise<string> => {
  const { data } = await axios.post(
    `${import.meta.env.VITE_API_URL}/generate`,
    postGenerateTripReq,
    { timeout: 60000 }
  );
  return data;
};

export default postGenerateTrip;
