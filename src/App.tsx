import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Main from './routes/Main';
import FormUncontrolled from './routes/FormUncontrolled';
import FormControlled from './routes/FormControlled';

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
        <Route path="/form-uncontrolled" element={<FormUncontrolled />} />
        <Route path="/form-controlled" element={<FormControlled />} />
      </Routes>
    </Router>
  );
}

export default App;
