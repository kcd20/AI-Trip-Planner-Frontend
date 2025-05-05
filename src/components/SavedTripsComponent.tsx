import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import dayjs from 'dayjs';
import { Link } from 'react-router';

import useSavedTripsQuery from '../hooks/useSavedTripsQuery';

const TableHeaders = [
  'Trip',
  'Created On',
  'Prefectures',
  'Length of Trip (Days)',
  'Arrival Airport',
  'Departure Airport',
  'Time of Arrival',
  'Time of Departure',
  'Export',
];

const SavedTripsComponent: React.FC = () => {
  const { data } = useSavedTripsQuery();

  if (!data) {
    return null;
  }

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
                  {dayjs(row.createdOn).toString()}
                </TableCell>
                <TableCell align="center">{row.destinations}</TableCell>
                <TableCell align="center">{row.lengthOfTrip}</TableCell>
                <TableCell align="center">{row.arrivalAirport}</TableCell>
                <TableCell align="center">{row.departureAirport}</TableCell>
                <TableCell align="center">{row.timeOfArrival}</TableCell>
                <TableCell align="center">{row.timeOfDeparture}</TableCell>
                <TableCell align="center">PDF</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default SavedTripsComponent;
