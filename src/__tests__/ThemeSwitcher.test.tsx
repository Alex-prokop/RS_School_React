import * as React from 'react';
import { render, screen } from '@testing-library/react';
import ThemeSwitcher from '../components/ThemeSwitcher';
import { ThemeProvider } from '../contexts/ThemeProvider';

test('renders ThemeSwitcher component', () => {
  render(
    <ThemeProvider>
      <ThemeSwitcher />
    </ThemeProvider>
  );
  expect(screen.getByText(/Switch to dark theme/i)).toBeInTheDocument();
});
