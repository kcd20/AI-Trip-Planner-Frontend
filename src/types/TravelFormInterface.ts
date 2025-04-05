interface TravelFormInterface {
  destinations: string[];
  lengthOfTrip: string;
  arrivalAirport?: string;
  departureAirport?: string;
  timeOfArrival?: string | null;
  timeOfDeparture?: string | null;
}

export default TravelFormInterface;
