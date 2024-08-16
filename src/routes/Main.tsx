import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

const Main = () => {
  const formData = useSelector((state: RootState) => state.form);

  return (
    <div>
      <h1>Submitted Data</h1>
      {formData.map((data, index) => (
        <div
          key={index}
          style={{
            border: '1px solid #ccc',
            marginBottom: '10px',
            padding: '10px',
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
          {/* Добавьте отображение других данных */}
        </div>
      ))}
    </div>
  );
};

export default Main;
