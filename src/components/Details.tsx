import React, { useState, useEffect } from 'react';
import { AstronomicalObjectV2FullResponse } from '../types';
import { useNavigate, useLocation } from 'react-router-dom';

const Details: React.FC = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get('details');
  const [data, setData] = useState<AstronomicalObjectV2FullResponse | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      const fetchData = async () => {
        console.log(`Fetching data for id: ${id}`);
        setIsLoading(true);
        setError(null);
        try {
          await new Promise((resolve) => setTimeout(resolve, 500)); // добавляем задержку для имитации времени загрузки
          const response = await fetch(
            `https://stapi.co/api/v2/rest/astronomicalObject?uid=${id}`
          );
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const result: AstronomicalObjectV2FullResponse =
            await response.json();
          console.log('API response:', result);
          setData(result);
        } catch (error) {
          setError((error as Error).message);
        } finally {
          setIsLoading(false);
        }
      };

      fetchData();
    }
  }, [id]);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error}</div>;
  }
  if (!data || !data.astronomicalObject) {
    return <div>No details available</div>;
  }

  const { astronomicalObject } = data;

  const handleClose = () => {
    queryParams.delete('details');
    navigate(`/?${queryParams.toString()}`);
  };

  return (
    <div>
      <h2>{astronomicalObject.name}</h2>
      <p>Type: {astronomicalObject.astronomicalObjectType}</p>
      {astronomicalObject.location && (
        <p>
          Location: {astronomicalObject.location.name} (UID:{' '}
          {astronomicalObject.location.uid})
        </p>
      )}
      {astronomicalObject.astronomicalObjects && (
        <div>
          <h3>Contained Objects:</h3>
          <ul>
            {astronomicalObject.astronomicalObjects.map((obj) => (
              <li key={obj.uid}>
                {obj.name} ({obj.astronomicalObjectType})
              </li>
            ))}
          </ul>
        </div>
      )}
      <button onClick={handleClose}>Close</button>
    </div>
  );
};

export default Details;
