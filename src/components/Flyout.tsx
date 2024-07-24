// src/components/Flyout.tsx
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { unselectItem } from '../features/astronomicalObjectsSlice';
import './Flyout.css';

const Flyout: React.FC = () => {
  const dispatch = useDispatch();
  const selectedItems = useSelector(
    (state: RootState) => state.astronomicalObjects.selectedItems
  );

  const handleUnselectAll = () => {
    selectedItems.forEach((item) => dispatch(unselectItem(item.uid)));
  };

  const handleDownload = () => {
    const csvContent =
      'data:text/csv;charset=utf-8,' +
      selectedItems
        .map(
          (item) => `${item.name},${item.astronomicalObjectType},${item.uid}`
        )
        .join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `${selectedItems.length}_items.csv`);
    document.body.appendChild(link);
    link.click();
  };

  if (selectedItems.length === 0) {
    return null;
  }

  return (
    <div className="flyout">
      <span>{selectedItems.length} items selected</span>
      <button onClick={handleUnselectAll}>Unselect All</button>
      <button onClick={handleDownload}>Download</button>
    </div>
  );
};

export default Flyout;
