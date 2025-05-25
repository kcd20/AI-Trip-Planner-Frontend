import { render, screen } from '@testing-library/react';
import escapeRegExp from 'lodash/escapeRegExp';
import { vi } from 'vitest';

import TripPdfComponent from './TripPdfComponent';
import '@testing-library/jest-dom';

// Mock the @react-pdf/renderer library
// This is crucial because @react-pdf/renderer components do not render to the DOM.
// We mock them to simple React components that pass through their children,
// allowing @testing-library/react to "see" the text content.
vi.mock('@react-pdf/renderer', () => ({
  // Document, Page, View are mocked to simply render their children.
  Document: ({ children }: { children: React.ReactNode }) => children,
  Page: ({ children }: { children: React.ReactNode }) => children,
  View: ({ children }: { children: React.ReactNode }) => children,
  // Text component is mocked to render its children directly.
  // This allows `screen.getByText` to find the text content.
  Text: ({ children }: { children: React.ReactNode }) => children,
  // StyleSheet.create is mocked to simply return the styles object,
  // as its primary function (creating PDF-specific styles) is not relevant for DOM testing.
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
  // Define mock data to be used for testing the component.
  const mockTripData: MockSavedTripsInterface = {
    destinations: ['Tokyo', 'Kyoto'],
    lengthOfTrip: '7',
    arrivalAirport: 'Narita International Airport (NRT)',
    departureAirport: 'Kansai International Airport (KIX)',
    timeOfArrival: '14:00',
    timeOfDeparture: '10:00',
    tripDetails: 'A wonderful trip exploring the culture and sights of Japan.',
  };

  test('renders trip details correctly', () => {
    // Render the TripPdfComponent with the mock data.
    render(<TripPdfComponent {...mockTripData} />);

    // Assert that the main title is present.
    expect(screen.getByText(/Trip/i)).toBeInTheDocument();

    // Assert that each label and its corresponding value are rendered correctly.
    // We can directly check for the text content because the `Text` component is mocked
    // to render its children.

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
