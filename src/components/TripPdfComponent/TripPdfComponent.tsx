import { Document, Page, StyleSheet, Text, View } from '@react-pdf/renderer';
import { FC } from 'react';

import SavedTripsInterface from '../../types/SavedTripsInterface';

const styles = StyleSheet.create({
  page: { padding: 48, fontSize: 14 },
  title: { fontSize: 20, marginBottom: 10, fontWeight: 'bold' },
  label: { textDecoration: 'underline' },
});

const TripPdfComponent: FC<Omit<SavedTripsInterface, 'createdOn' | 'id'>> = ({
  destinations,
  lengthOfTrip,
  arrivalAirport,
  departureAirport,
  timeOfArrival,
  timeOfDeparture,
  tripDetails,
}) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View>
          <Text style={styles.title}>Trip</Text>
          <Text style={styles.label}>Prefectures</Text>
          <Text>{destinations.join(',')}</Text>

          <Text>{'\n'}</Text>

          <Text style={styles.label}>Length of Trip (days)</Text>
          <Text>{lengthOfTrip}</Text>

          <Text>{'\n'}</Text>

          <Text style={styles.label}>Arrival Airport</Text>
          <Text>{arrivalAirport}</Text>

          <Text>{'\n'}</Text>

          <Text style={styles.label}>Departure Airport</Text>
          <Text>{departureAirport}</Text>

          <Text>{'\n'}</Text>

          <Text style={styles.label}>Time of Arrival</Text>
          <Text>{timeOfArrival}</Text>

          <Text>{'\n'}</Text>

          <Text style={styles.label}>Time of Departure</Text>
          <Text>{timeOfDeparture}</Text>

          <Text>{'\n'}</Text>

          <Text style={styles.label}>Trip Details</Text>
          <Text>{tripDetails}</Text>
        </View>
      </Page>
    </Document>
  );
};

export default TripPdfComponent;
