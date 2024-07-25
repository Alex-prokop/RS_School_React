import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import {
  fetchFullDetails,
  unselectItem,
} from '../features/astronomicalObjectsSlice';
import Button from './Button';
import styles from './Flyout.module.css';

const Flyout: React.FC = () => {
  const dispatch = useDispatch();
  const selectedItems = useSelector(
    (state: RootState) => state.astronomicalObjects.selectedItems
  );
  const fullDetails = useSelector(
    (state: RootState) => state.astronomicalObjects.fullDetails
  );
  const [loading, setLoading] = useState(false);
  const [detailsFetched, setDetailsFetched] = useState(false);

  // Unselect all selected items
  const handleUnselectAll = () => {
    selectedItems.forEach((item) => dispatch(unselectItem(item.uid)));
  };

  // Effect to check if all details are fetched
  useEffect(() => {
    if (loading && selectedItems.length === Object.keys(fullDetails).length) {
      setDetailsFetched(true);
      setLoading(false);
    }
  }, [fullDetails, loading, selectedItems.length]);

  // Download the CSV file
  const handleDownload = async () => {
    setLoading(true);
    console.log('Starting download process');

    // Fetch full details for each selected item
    for (const item of selectedItems) {
      if (!fullDetails[item.uid]) {
        console.log(`Fetching details for uid: ${item.uid}`);
        await dispatch(fetchFullDetails(item.uid)).unwrap();
      }
    }
  };

  // Effect to generate CSV once details are fetched
  useEffect(() => {
    if (detailsFetched) {
      const csvHeaders =
        'Name,Type,Location Name,Location Type,Parent Location\n';
      const csvContent =
        csvHeaders +
        selectedItems
          .map((item) => {
            const fullDetail = fullDetails[item.uid];
            if (!fullDetail) {
              console.log(`No details found for uid: ${item.uid}`);
              return ''; // In case full detail is not fetched
            }

            const locationName =
              fullDetail.astronomicalObject.location?.name || '';
            const locationType =
              fullDetail.astronomicalObject.location?.astronomicalObjectType ||
              '';
            const parentLocationName =
              fullDetail.astronomicalObject.location?.location?.name || '';

            const csvLine = `${fullDetail.astronomicalObject.name},${fullDetail.astronomicalObject.astronomicalObjectType},${locationName},${locationType},${parentLocationName}`;
            console.log(`CSV line for uid: ${item.uid}`, csvLine);
            return csvLine;
          })
          .join('\n');

      console.log('CSV content', csvContent);

      const encodedUri = encodeURI('data:text/csv;charset=utf-8,' + csvContent);
      const link = document.createElement('a');
      link.setAttribute('href', encodedUri);
      link.setAttribute('download', `${selectedItems.length}_items.csv`);
      document.body.appendChild(link);
      link.click();
      console.log('Download process completed');

      // Reset the flag
      setDetailsFetched(false);
    }
  }, [detailsFetched, fullDetails, selectedItems]);

  if (selectedItems.length === 0) {
    return null;
  }

  return (
    <div className={styles.flyout}>
      <div className={styles.container}>
        <Button onClick={handleUnselectAll} disabled={loading}>
          Unselect All
        </Button>
        <span className={styles.selectedCount}>
          {selectedItems.length} items selected
        </span>
        <Button onClick={handleDownload} disabled={loading}>
          {loading ? 'Downloading...' : 'Download'}
        </Button>
      </div>
    </div>
  );
};

export default Flyout;
