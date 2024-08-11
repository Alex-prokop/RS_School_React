import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider, ThemeContext } from '../contexts/ThemeProvider';

const TestComponent: React.FC = () => {
  const { theme, toggleTheme } = React.useContext(ThemeContext);
  return (
    <div>
      <p data-testid="theme">{theme}</p>
      <button data-testid="toggle" onClick={toggleTheme}>
        Toggle Theme
      </button>
    </div>
  );
};

describe('ThemeProvider', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should use light theme as default', () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    expect(screen.getByTestId('theme').textContent).toBe('light');
  });

  it('should load theme from localStorage', () => {
    localStorage.setItem('theme', 'dark');
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    expect(screen.getByTestId('theme').textContent).toBe('dark');
  });

  it('should toggle theme', () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    const toggleButton = screen.getByTestId('toggle');
    fireEvent.click(toggleButton);

    expect(screen.getByTestId('theme').textContent).toBe('dark');

    fireEvent.click(toggleButton);

    expect(screen.getByTestId('theme').textContent).toBe('light');
  });

  it('should save theme to localStorage when toggled', () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    const toggleButton = screen.getByTestId('toggle');
    fireEvent.click(toggleButton);

    expect(localStorage.getItem('theme')).toBe('dark');

    fireEvent.click(toggleButton);

    expect(localStorage.getItem('theme')).toBe('light');
  });
});
