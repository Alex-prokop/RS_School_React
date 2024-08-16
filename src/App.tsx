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
            <Link to="/">Main</Link>
          </li>
          <li>
            <Link to="/form-uncontrolled">Uncontrolled Form</Link>
          </li>
          <li>
            <Link to="/form-controlled">Controlled Form</Link>
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
