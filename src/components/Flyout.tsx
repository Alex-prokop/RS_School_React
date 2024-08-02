// components/Flyout.tsx
import React, { useState, useEffect } from 'react';
import { RootState } from '../store/index';
import { useDispatch, useSelector } from 'react-redux';

import {
  fetchFullDetails,
  unselectItem,
} from '../services/astronomicalObjectsSlice';
import Button from './Button';
import styles from '../styles/Flyout.module.css';

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

  const handleUnselectAll = () => {
    selectedItems.forEach((item) => dispatch(unselectItem(item.uid)));
  };

  useEffect(() => {
    if (loading && selectedItems.length === Object.keys(fullDetails).length) {
      setDetailsFetched(true);
      setLoading(false);
    }
  }, [fullDetails, loading, selectedItems.length]);

  const handleDownload = async () => {
    setLoading(true);
    for (const item of selectedItems) {
      if (!fullDetails[item.uid]) {
        await dispatch(fetchFullDetails(item.uid)).unwrap();
      }
    }
  };

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
              return '';
            }

            const locationName =
              fullDetail.astronomicalObject.location?.name || '';
            const locationType =
              fullDetail.astronomicalObject.location?.astronomicalObjectType ||
              '';
            const parentLocationName =
              fullDetail.astronomicalObject.location?.location?.name || '';

            const csvLine = `${fullDetail.astronomicalObject.name},${fullDetail.astronomicalObject.astronomicalObjectType},${locationName},${locationType},${parentLocationName}`;
            return csvLine;
          })
          .join('\n');

      const encodedUri = encodeURI('data:text/csv;charset=utf-8,' + csvContent);
      const link = document.createElement('a');
      link.setAttribute('href', encodedUri);
      link.setAttribute('download', `${selectedItems.length}_items.csv`);
      document.body.appendChild(link);
      link.click();
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
