import { useAuth } from '@clerk/clerk-react';
import DeleteIcon from '@mui/icons-material/Delete';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { useQueryClient } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { useSetAtom } from 'jotai';
import { Link } from 'react-router';

import deleteTrip from '../api/deleteTrip';
import { DATE_DISPLAY_FORMAT, DATE_TIME_DISPLAY_FORMAT } from '../constants';
import useSavedTripsQuery from '../hooks/useSavedTripsQuery';
import { modalPropsAtom, openModalAtom } from '../store/atoms';

import TripPdfComponent from './TripPdfComponent';

const TableHeaders = [
  'Trip',
  'Created On',
  'Prefectures',
  'Length of Trip (Days)',
  'Arrival Airport',
  'Departure Airport',
  'Time of Arrival',
  'Time of Departure',
  'Export PDF',
  'Delete',
];

const SavedTripsComponent: React.FC = () => {
  const { data } = useSavedTripsQuery();
  const { getToken } = useAuth();
  const queryClient = useQueryClient();
  const setOpenModal = useSetAtom(openModalAtom);
  const setModalProps = useSetAtom(modalPropsAtom);

  if (!data) {
    return null;
  }

  const removeTrip = async (id: string) => {
    const token = await getToken();
    await deleteTrip(id, token);
    await queryClient.invalidateQueries({ queryKey: ['savedTrips'] });
  };

  const onClickDelete = (id: string) => {
    setModalProps({
      description: 'Are you sure you want to delete this trip?',
      proceedAction: async () => {
        await removeTrip(id);
        setOpenModal(false);
      },
    });
    setOpenModal(true);
  };

  return (
    <TableContainer
      component={Paper}
      sx={{ marginTop: '5rem', maxWidth: '90%' }}
    >
      <Table>
        <TableHead>
          <TableRow>
            {TableHeaders.map((header) => (
              <TableCell key={header} align="center">
                {header}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => {
            return (
              <TableRow key={row.createdOn}>
                <TableCell align="center" component="th" scope="row">
                  <Link
                    state={row.id}
                    style={{ textDecoration: 'none' }}
                    to="/"
                  >
                    View Trip Details
                  </Link>
                </TableCell>
                <TableCell align="center">
                  {dayjs(Number(row.createdOn)).format(
                    DATE_TIME_DISPLAY_FORMAT
                  )}
                </TableCell>
                <TableCell align="center">
                  {row.destinations.join(', ')}
                </TableCell>
                <TableCell align="center">{row.lengthOfTrip}</TableCell>
                <TableCell align="center">{row.arrivalAirport}</TableCell>
                <TableCell align="center">{row.departureAirport}</TableCell>
                <TableCell align="center">{row.timeOfArrival}</TableCell>
                <TableCell align="center">{row.timeOfDeparture}</TableCell>
                <TableCell align="center">
                  <PDFDownloadLink
                    document={
                      <TripPdfComponent
                        arrivalAirport={row.arrivalAirport}
                        departureAirport={row.departureAirport}
                        destinations={row.destinations}
                        lengthOfTrip={row.lengthOfTrip}
                        timeOfArrival={row.timeOfArrival}
                        timeOfDeparture={row.timeOfDeparture}
                        tripDetails={row.tripDetails}
                      />
                    }
                    fileName={`${dayjs(Number(row.createdOn)).format(
                      DATE_DISPLAY_FORMAT
                    )}_${row.destinations.join('_')}.pdf`}
                  >
                    <PictureAsPdfIcon
                      sx={{ color: '#1976d2', cursor: 'pointer' }}
                    />
                  </PDFDownloadLink>
                </TableCell>
                <TableCell align="center">
                  <DeleteIcon
                    sx={{ color: '#1976d2', cursor: 'pointer' }}
                    onClick={() => onClickDelete(row.id)}
                  />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default SavedTripsComponent;
