interface TravelFormInterface {
  destinations: string[];
  lengthOfTrip: string;
  arrivalAirport: string;
  departureAirport: string;
  timeOfArrival: string | null;
  timeOfDeparture: string | null;
  tripDetails: string;
}

export default TravelFormInterface;
