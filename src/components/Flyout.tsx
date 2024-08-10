'use client';

import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store';
import {
  fetchFullDetails,
  unselectItem,
} from '../services/astronomicalObjectsSlice';
import Button from './Button';
import styles from '../styles/Flyout.module.css';
import {
  AstronomicalObjectV2FullResponse,
  AstronomicalObjectHeader,
  AstronomicalObjectV2Base,
} from '../types';

interface FlyoutProps {
  selectedItems: AstronomicalObjectV2Base[];
  fullDetails: Record<string, AstronomicalObjectV2FullResponse>;
}

const Flyout: React.FC<FlyoutProps> = ({ selectedItems, fullDetails }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [loading, setLoading] = useState(false);
  const [detailsFetched, setDetailsFetched] = useState(false);

  const handleUnselectAll = () => {
    selectedItems.forEach((item) => dispatch(unselectItem(item.uid)));
  };

  const handleDownload = async () => {
    setLoading(true);
    const fetchDetailsPromises = selectedItems.map(async (item) => {
      if (!fullDetails[item.uid]) {
        try {
          const result = await dispatch(fetchFullDetails(item.uid)).unwrap();
          console.log('Fetched details:', result);
        } catch (error) {
          console.error('Failed to fetch details:', error);
        }
      }
    });
    await Promise.all(fetchDetailsPromises);
    setLoading(false);
    setDetailsFetched(true);
  };

  useEffect(() => {
    if (detailsFetched) {
      const csvHeaders = 'Name,Type,Location Name,Parent Location\n';
      const csvContent =
        csvHeaders +
        selectedItems
          .map((item) => {
            const fullDetail = fullDetails[
              item.uid
            ] as AstronomicalObjectV2FullResponse;
            if (!fullDetail) {
              return '';
            }

            const location = fullDetail.astronomicalObject
              .location as AstronomicalObjectHeader;
            const locationName = location?.name || '';
            const parentLocationName = location?.location?.name || '';

            const csvLine = `${fullDetail.astronomicalObject.name},${fullDetail.astronomicalObject.astronomicalObjectType},${locationName},${parentLocationName}`;
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
