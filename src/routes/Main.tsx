import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

const Main = () => {
  const formData = useSelector((state: RootState) => state.form);

  const [recentSubmissionIndex, setRecentSubmissionIndex] = useState<
    number | null
  >(null);

  useEffect(() => {
    if (formData.length > 0) {
      console.log('Form data loaded:', formData);
      setRecentSubmissionIndex(formData.length - 1);

      const timer = setTimeout(() => setRecentSubmissionIndex(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [formData]);

  return (
    <div>
      <h1>Submitted Data</h1>
      {formData.map((data, index) => (
        <div
          key={index}
          style={{
            border:
              recentSubmissionIndex === index
                ? '2px solid #4CAF50'
                : '1px solid #ccc',
            marginBottom: '10px',
            padding: '10px',
            backgroundColor:
              recentSubmissionIndex === index ? '#e8f5e9' : '#f9f9f9',
            transition: 'background-color 0.5s ease, border 0.5s ease',
          }}
        >
          <p>
            <strong>Name:</strong> {data.name}
          </p>
          <p>
            <strong>Age:</strong> {data.age}
          </p>
          <p>
            <strong>Email:</strong> {data.email}
          </p>
          <p>
            <strong>Gender:</strong> {data.gender}
          </p>
          <p>
            <strong>Country:</strong> {data.country}
          </p>
          <p>
            <strong>Accepted Terms and Conditions:</strong>{' '}
            {data.terms ? 'Yes' : 'No'}
          </p>
          {data.picture && (
            <div>
              <strong>Uploaded Picture:</strong>
              <br />
              <img
                src={data.picture}
                alt="Uploaded"
                style={{ maxWidth: '150px', maxHeight: '150px' }}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Main;
