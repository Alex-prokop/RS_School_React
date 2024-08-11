import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useGetAstronomicalObjectByIdQuery } from '../services/astronomicalObjectsApi';

interface DetailsProps {
  id: string;
}

const Details: React.FC<DetailsProps> = ({ id }) => {
  const router = useRouter();
  const { data, isLoading, error } = useGetAstronomicalObjectByIdQuery(id, {
    refetchOnMountOrArgChange: true,
  });

  const handleClose = () => {
    const queryParams = new URLSearchParams(window.location.search);
    queryParams.delete('details');
    router.push(`/?${queryParams.toString()}`, undefined, { shallow: true });
  };

  useEffect(() => {
    console.log('Details component rendered with ID:', id);
  }, [id]);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    const errorMessage =
      'status' in error && error.status
        ? `Error: ${error.status}`
        : 'message' in error
          ? `Error: ${error.message}`
          : 'Unknown error';
    return <div>{errorMessage}</div>;
  }
  if (!data || !data.astronomicalObject) {
    return <div>No details available</div>;
  }

  const { astronomicalObject } = data;

  console.log('Rendered details for:', astronomicalObject.name);

  return (
    <div className="details-card">
      <button onClick={handleClose}>&#x2715;</button>

      <h2>{astronomicalObject.name}</h2>
      <p>Type: {astronomicalObject.astronomicalObjectType}</p>

      {astronomicalObject.location && (
        <div>
          <h3>Location</h3>
          <p>Name: {astronomicalObject.location.name}</p>
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
