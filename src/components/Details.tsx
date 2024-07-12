import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { AstronomicalObject } from '../types';

interface DetailsProps {
  id?: string;
}

const Details: React.FC<DetailsProps> = ({ id }) => {
  const params = useParams<{ id: string }>();
  const itemId = id || params.id;
  const [data, setData] = useState<AstronomicalObject | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(
          `https://stapi.co/api/v2/rest/astronomicalObject?uid=${itemId}`,
        );
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        setData(result.astronomicalObject); // Убедитесь, что result содержит нужный объект
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [itemId]);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error}</div>;
  }
  if (!data) {
    return <div>No details available</div>;
  }

  return (
    <div>
      <h2>{data.name}</h2>
      <p>Type: {data.astronomicalObjectType}</p>
      {data.location && (
        <p>
          Location: {data.location.name} (UID: {data.location.uid})
        </p>
      )}
    </div>
  );
};

export default Details;
