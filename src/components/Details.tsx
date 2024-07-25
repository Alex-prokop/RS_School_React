import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useGetAstronomicalObjectByIdQuery } from '../services/astronomicalObjectsApi';
import './Details.css';

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
    <div className="details-card">
      <button onClick={handleClose}>&#x2715;</button>

      <h2>{astronomicalObject.name}</h2>
      <p>Type: {astronomicalObject.astronomicalObjectType}</p>

      {astronomicalObject.location && (
        <div>
          <h3>Location</h3>
          <p>Name: {astronomicalObject.location.name}</p>
          <p>Type: {astronomicalObject.location.astronomicalObjectType}</p>
          {astronomicalObject.location.location && (
            <p>Parent Location: {astronomicalObject.location.location.name}</p>
          )}
        </div>
      )}

      {astronomicalObject.astronomicalObjects &&
        astronomicalObject.astronomicalObjects.length > 0 && (
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
    </div>
  );
};

export default Details;
1;
