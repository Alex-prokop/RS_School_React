import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { ThemeProvider } from '../contexts/ThemeProvider';
import Header from '../components/Header';

test('renders Header component', () => {
  render(
    <MemoryRouter>
      <ThemeProvider>
        <Header onSearch={() => {}} throwError={() => {}} />
      </ThemeProvider>
    </MemoryRouter>
  );
  expect(screen.getByText(/Throw Error/i)).toBeInTheDocument();
  expect(
    screen.getByPlaceholderText(/Search by name or type/i)
  ).toBeInTheDocument();
  expect(screen.getByText(/Switch to dark theme/i)).toBeInTheDocument();
});
