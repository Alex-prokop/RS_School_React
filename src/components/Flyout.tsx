// Flyout.tsx
import React, { useEffect, useState } from 'react';
import { AstronomicalObjectV2Base } from '../types';

interface FlyoutProps {
  selectedItems: AstronomicalObjectV2Base[];
}

const Flyout: React.FC<FlyoutProps> = ({ selectedItems = [] }) => {
  const [fullDetails, setFullDetails] = useState<AstronomicalObjectV2Base[]>(
    []
  );
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (selectedItems.length > 0 && !loading) {
      setLoading(true);
      // Simulate fetching full details
      setTimeout(() => {
        setFullDetails(selectedItems);
        setLoading(false);
      }, 1000);
    }
  }, [selectedItems, loading]);

  const handleDownload = async () => {
    setLoading(true);
    // Simulate download
    setTimeout(() => {
      console.log('Downloading:', fullDetails);
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="flyout">
      <h2>Selected Items</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {fullDetails.map((item) => (
            <li key={item.uid}>{item.name}</li>
          ))}
        </ul>
      )}
      <button onClick={handleDownload} disabled={loading}>
        Download Details
      </button>
    </div>
  );
};

export default Flyout;
