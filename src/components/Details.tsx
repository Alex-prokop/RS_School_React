import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useGetAstronomicalObjectByIdQuery } from '../services/astronomicalObjectsApi';

const Details: React.FC = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get('details');
  const navigate = useNavigate();

  const { data, isLoading, error } = useGetAstronomicalObjectByIdQuery(
    id || ''
  );

  const handleClose = () => {
    queryParams.delete('details');
    navigate(`/?${queryParams.toString()}`);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }
  if (!data || !data.astronomicalObject) {
    return <div>No details available</div>;
  }

  const { astronomicalObject } = data;

  return (
    <div className="card">
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
