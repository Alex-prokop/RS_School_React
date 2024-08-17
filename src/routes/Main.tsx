import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import './Main.css';

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
    <div className="container">
      <h1 className="header">Submitted Data:</h1>
      {formData.map((data, index) => (
        <div
          key={index}
          className={`card ${
            recentSubmissionIndex === index ? 'highlight' : ''
          }`}
        >
          {data.picture && (
            <div className="image-container">
              <img src={data.picture} alt="Uploaded" className="image" />
            </div>
          )}
          <div className="info">
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
          </div>
        </div>
      ))}
    </div>
  );
};

export default Main;
