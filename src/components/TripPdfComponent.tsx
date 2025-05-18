import { Document, Page, StyleSheet, Text, View } from '@react-pdf/renderer';
import { FC } from 'react';

import SavedTripsInterface from '../types/SavedTripsInterface';

const styles = StyleSheet.create({
  page: { padding: 30 },
  section: { marginBottom: 10 },
  title: { fontSize: 20, marginBottom: 10 },
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
        <View style={styles.section}>
          <Text style={styles.title}>Trip</Text>
          <Text>Prefectures</Text>
          <Text>{destinations.join(',')}</Text>

          <Text>Length of Trip (days)</Text>
          <Text>{lengthOfTrip}</Text>

          <Text>Arrival Airport</Text>
          <Text>{arrivalAirport}</Text>

          <Text>Departure Airport</Text>
          <Text>{departureAirport}</Text>

          <Text>Time of Arrival</Text>
          <Text>{timeOfArrival}</Text>

          <Text>Time of Departure</Text>
          <Text>{timeOfDeparture}</Text>

          <Text>Trip Details</Text>
          <Text>{tripDetails}</Text>
        </View>
      </Page>
    </Document>
  );
};

export default TripPdfComponent;
