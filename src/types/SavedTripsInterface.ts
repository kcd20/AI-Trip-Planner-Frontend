interface SavedTripsInterface {
  createdOn: string;
  id: string;
  destinations: string[];
  lengthOfTrip: string;
  arrivalAirport?: string;
  departureAirport?: string;
  timeOfArrival?: string;
  timeOfDeparture?: string;
  tripDetails: string;
}

export default SavedTripsInterface;
