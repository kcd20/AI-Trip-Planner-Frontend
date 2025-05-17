import { Dayjs } from 'dayjs';

interface TravelFormInterface {
  destinations: string[];
  lengthOfTrip: string;
  arrivalAirport?: string;
  departureAirport?: string;
  timeOfArrival?: Dayjs;
  timeOfDeparture?: Dayjs;
}

export default TravelFormInterface;
