import TravelFormInterface from '../types/TravelFormInterface';

const generatePrompt = ({
  destinations,
  lengthOfTrip,
  arrivalAirport,
  departureAirport,
  timeOfArrival,
  timeOfDeparture,
}: TravelFormInterface): string => {
  const prompt = `Create a travel itinerary for Japan based on the following details: Destination(s): ${destinations.join(',')}, Length of Trip: ${lengthOfTrip} day(s), ${arrivalAirport && `Arrival Airport: ${arrivalAirport},`} ${departureAirport && `Departure Airport: ${departureAirport},`} ${timeOfArrival ? `Time of Arrival: ${timeOfArrival},` : ''} ${timeOfDeparture ? `Time of Departure: ${timeOfDeparture}` : ''}`;
  return prompt;
};

export default generatePrompt;
