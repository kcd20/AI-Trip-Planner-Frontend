import dayjs, { Dayjs } from 'dayjs';
import isNaN from 'lodash/isNaN';
import { z } from 'zod/v4';

const zodDay = z.custom<Dayjs>((val) => val instanceof dayjs, 'Invalid date');
// Please enter the length of your trip.
export const travelFormSchema = z.object({
  // destinations
  destinations: z
    .array(z.string())
    .min(1, 'Please select at least 1 prefecture.'),

  // lengthOfTrip
  lengthOfTrip: z
    .string()
    .nonempty('Length of trip cannot be empty.')
    .refine((val) => !isNaN(Number(val)), 'Please enter a valid number.')
    .refine(
      (val) => Number(val) <= 31,
      'Please enter a number that is 31 or less'
    )
    .refine((val) => Number(val) > 0, 'Please enter only positive numbers.'),

  // arrivalAirport
  arrivalAirport: z.string().optional(),

  // departureAirport
  departureAirport: z.string().optional(),

  // timeOfArrival
  timeOfArrival: zodDay.optional(),

  // timeOfDeparture
  timeOfDeparture: zodDay.optional(),
});

export type TravelForm = z.infer<typeof travelFormSchema>;
