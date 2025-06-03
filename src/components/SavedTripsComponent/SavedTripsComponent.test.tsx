import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { vi } from 'vitest';

import SavedTripsComponent from './SavedTripsComponent';

vi.mock('../../hooks/useSavedTripsQuery', () => ({
  default: () => ({
    data: [
      {
        _id: '123',
        user: 'mockUser',
        id: 'mockId',
        createdOn: '1747500409036',
        destinations: ['Tokyo', 'Osaka'],
        lengthOfTrip: '7',
        arrivalAirport: 'Kansai International Airport (KIX)',
        departureAirport: 'Narita International Airport (NRT)',
        timeOfArrival: '10:00 AM',
        timeOfDeparture: '03:00 PM',
        tripDetails: 'Some details',
      },
    ],
  }),
}));

vi.mock('@clerk/clerk-react', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@clerk/clerk-react')>();
  return {
    ...actual,
    useAuth: () => ({
      getToken: vi.fn(() => 'mocked-token'),
    }),
  };
});

const mockOnClickDelete = vi.fn();
vi.mock(
  '../../hooks/useSavedTripsComponentLogic/useSavedTripsComponentLogic',
  () => ({
    default: () => ({
      onClickDelete: vi.fn((id) => mockOnClickDelete(id)),
    }),
  })
);

vi.mock('@react-pdf/renderer', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@react-pdf/renderer')>();
  return {
    ...actual,
    PDFDownloadLink: vi.fn(({ fileName, children }) => (
      <div data-filename={fileName} data-testid="PDFDownloadLink">
        {children}
      </div>
    )),
  };
});

describe('SavedTripsComponent', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('renders correctly with saved trips data', () => {
    render(<SavedTripsComponent />, { wrapper: BrowserRouter });

    // Check if table headers are rendered
    expect(screen.getByText('Trip')).toBeInTheDocument();
    expect(screen.getByText('Created On')).toBeInTheDocument();
    expect(screen.getByText('Prefectures')).toBeInTheDocument();
    expect(screen.getByText('Length of Trip (Days)')).toBeInTheDocument();
    expect(screen.getByText('Arrival Airport')).toBeInTheDocument();
    expect(screen.getByText('Departure Airport')).toBeInTheDocument();
    expect(screen.getByText('Time of Arrival')).toBeInTheDocument();
    expect(screen.getByText('Time of Departure')).toBeInTheDocument();
    expect(screen.getByText('Export PDF')).toBeInTheDocument();
    expect(screen.getByText('Delete')).toBeInTheDocument();

    // Check if trip data is rendered
    expect(screen.getByText('View Trip Details')).toBeInTheDocument(); // For the link
    expect(screen.getByText('Tokyo, Osaka')).toBeInTheDocument();
    expect(screen.getByText('7')).toBeInTheDocument();
    expect(
      screen.getByText('Kansai International Airport (KIX)')
    ).toBeInTheDocument();
    expect(
      screen.getByText('Narita International Airport (NRT)')
    ).toBeInTheDocument();
    expect(screen.getByText('10:00 AM')).toBeInTheDocument();
    expect(screen.getByText('03:00 PM')).toBeInTheDocument();
  });

  test('renders "View Trip Details" link', () => {
    render(<SavedTripsComponent />, { wrapper: BrowserRouter });

    const linkElement = screen.getByText('View Trip Details');
    expect(linkElement).toHaveAttribute('href', '/');
  });

  test('renders PDFDownloadLink', () => {
    render(<SavedTripsComponent />, { wrapper: BrowserRouter });

    const pdfLinkElement = screen.getByTestId('PDFDownloadLink');

    expect(pdfLinkElement).toBeInTheDocument();
  });

  test('calls onClickDelete with correct id when delete icon is clicked', () => {
    render(<SavedTripsComponent />, { wrapper: BrowserRouter });

    const deleteIcons = screen.getAllByTestId('DeleteIcon');
    fireEvent.click(deleteIcons[0]);

    expect(mockOnClickDelete).toHaveBeenCalledTimes(1);
    expect(mockOnClickDelete).toHaveBeenCalledWith('mockId');
  });
});
