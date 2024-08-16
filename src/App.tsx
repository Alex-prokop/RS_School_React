import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Main from './routes/Main';
import FormUncontrolledContainer from './routes/FormUncontrolledContainer'; // Импортируйте контейнерный компонент
import FormControlledContainer from './routes/FormControlledContainer'; // Импортируйте контейнерный компонент

function App() {
  return (
    <Router>
      <nav>
        <ul>
          <li>
            <Link
              to="/"
              onClick={() => console.log('Navigating to Main route')}
            >
              Main
            </Link>
          </li>
          <li>
            <Link
              to="/form-uncontrolled"
              onClick={() =>
                console.log('Navigating to Uncontrolled Form route')
              }
            >
              Uncontrolled Form
            </Link>
          </li>
          <li>
            <Link
              to="/form-controlled"
              onClick={() => console.log('Navigating to Controlled Form route')}
            >
              Controlled Form
            </Link>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route
          path="/form-uncontrolled"
          element={<FormUncontrolledContainer />}
        />{' '}
        {/* Используем контейнер */}
        <Route path="/form-controlled" element={<FormControlledContainer />} />
      </Routes>
    </Router>
  );
}

export default App;
