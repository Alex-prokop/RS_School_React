import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
} from 'react-router-dom';
import Main from './routes/Main';
import FormUncontrolledContainer from './routes/FormUncontrolledContainer';
import FormControlledContainer from './routes/FormControlledContainer';
import './App.css';

function App() {
  return (
    <Router>
      <nav>
        <ul>
          <li>
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? 'active' : '')}
              onClick={() => console.log('Navigating to Main route')}
            >
              Main
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/form-uncontrolled"
              className={({ isActive }) => (isActive ? 'active' : '')}
              onClick={() =>
                console.log('Navigating to Uncontrolled Form route')
              }
            >
              Uncontrolled Form
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/form-controlled"
              className={({ isActive }) => (isActive ? 'active' : '')}
              onClick={() => console.log('Navigating to Controlled Form route')}
            >
              Controlled Form
            </NavLink>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route
          path="/form-uncontrolled"
          element={<FormUncontrolledContainer />}
        />
        <Route path="/form-controlled" element={<FormControlledContainer />} />
      </Routes>
    </Router>
  );
}

export default App;
