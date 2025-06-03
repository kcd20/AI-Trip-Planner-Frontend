import { render, screen } from '@testing-library/react';
import escapeRegExp from 'lodash/escapeRegExp';
import { vi } from 'vitest';

import TripPdfComponent from './TripPdfComponent';
import '@testing-library/jest-dom';

vi.mock('@react-pdf/renderer', () => ({
  Document: ({ children }: { children: React.ReactNode }) => children,
  Page: ({ children }: { children: React.ReactNode }) => children,
  View: ({ children }: { children: React.ReactNode }) => children,
  Text: ({ children }: { children: React.ReactNode }) => children,
  StyleSheet: {
    create: (styles: any) => styles,
  },
}));

interface MockSavedTripsInterface {
  destinations: string[];
  lengthOfTrip: string;
  arrivalAirport: string;
  departureAirport: string;
  timeOfArrival: string;
  timeOfDeparture: string;
  tripDetails: string;
}

describe('TripPdfComponent', () => {
  const mockTripData: MockSavedTripsInterface = {
    destinations: ['Tokyo', 'Kyoto'],
    lengthOfTrip: '7',
    arrivalAirport: 'Narita International Airport (NRT)',
    departureAirport: 'Kansai International Airport (KIX)',
    timeOfArrival: '14:00',
    timeOfDeparture: '10:00',
    tripDetails: 'A wonderful trip exploring the culture and sights of Japan.',
  };

  it('renders trip details correctly', () => {
    render(<TripPdfComponent {...mockTripData} />);

    expect(screen.getByText(/Trip/i)).toBeInTheDocument();
    // Prefectures
    expect(screen.getByText(/Prefectures/i)).toBeInTheDocument();
    expect(
      screen.getByText(new RegExp(mockTripData.destinations.join(','), 'i'))
    ).toBeInTheDocument();

    // Length of Trip
    expect(screen.getByText(/Length of Trip \(days\)/i)).toBeInTheDocument();
    expect(
      screen.getByText(new RegExp(mockTripData.lengthOfTrip.toString(), 'i'))
    ).toBeInTheDocument();

    // Arrival Airport
    expect(screen.getByText(/Arrival Airport/i)).toBeInTheDocument();
    expect(
      screen.getByText(
        new RegExp(escapeRegExp(mockTripData.arrivalAirport), 'i')
      )
    ).toBeInTheDocument();

    // Departure Airport
    expect(screen.getByText(/Departure Airport/i)).toBeInTheDocument();
    expect(
      screen.getByText(
        new RegExp(escapeRegExp(mockTripData.departureAirport), 'i')
      )
    ).toBeInTheDocument();

    // Time of Arrival
    expect(screen.getByText(/Time of Arrival/i)).toBeInTheDocument();
    expect(
      screen.getByText(
        new RegExp(escapeRegExp(mockTripData.timeOfArrival), 'i')
      )
    ).toBeInTheDocument();

    // Time of Departure
    expect(screen.getByText(/Time of Departure/i)).toBeInTheDocument();
    expect(
      screen.getByText(
        new RegExp(escapeRegExp(mockTripData.timeOfDeparture), 'i')
      )
    ).toBeInTheDocument();

    // Trip Details
    expect(screen.getByText(/Trip Details/i)).toBeInTheDocument();

    expect(
      screen.getByText(new RegExp(escapeRegExp(mockTripData.tripDetails), 'i'))
    ).toBeInTheDocument();
  });
});
