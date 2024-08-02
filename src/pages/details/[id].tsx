// pages/details/[id].tsx
import React from 'react';
import { useRouter } from 'next/router';
import { useGetAstronomicalObjectByIdQuery } from '../../services/astronomicalObjectsApi';

const Details: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data, isLoading, error } = useGetAstronomicalObjectByIdQuery(
    id as string
  );

  const handleClose = () => {
    router.push('/');
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
      <button onClick={handleClose}>✕</button>
      <h2>{astronomicalObject.name}</h2>
      <p>Type: {astronomicalObject.astronomicalObjectType}</p>

      {astronomicalObject.location && (
        <div>
          <h3>Location</h3>
          <p>Name: {astronomicalObject.location.name}</p>
          <p>Type: {astronomicalObject.location.astronomicalObjectType}</p>
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
