import React, { ReactNode } from 'react';
import { render, screen } from '@testing-library/react';
import { useTheme } from '../hooks/useTheme';
import { ThemeContext, ThemeContextProps } from '../contexts/ThemeProvider';
import { vi } from 'vitest';

const TestComponent: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <div>
      <p data-testid="theme">{theme}</p>
      <button data-testid="toggle" onClick={toggleTheme}>
        Toggle Theme
      </button>
    </div>
  );
};

const renderWithThemeProvider = (
  ui: ReactNode,
  { theme = 'light', toggleTheme = vi.fn() }: Partial<ThemeContextProps> = {}
) => {
  const Wrapper: React.FC = ({ children }) => (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );

  return render(ui, { wrapper: Wrapper });
};

describe('useTheme', () => {
  it('should throw error if used outside of ThemeProvider', () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    const renderComponentOutsideProvider = () => render(<TestComponent />);
    try {
      renderComponentOutsideProvider();
    } catch (error) {
      expect(error).toEqual(
        new Error('useTheme must be used within a ThemeProvider')
      );
    }
    consoleSpy.mockRestore();
  });

  it('should use theme from context', () => {
    renderWithThemeProvider(<TestComponent />, { theme: 'dark' });

    expect(screen.getByTestId('theme').textContent).toBe('dark');
  });

  it('should call toggleTheme from context', () => {
    const toggleTheme = vi.fn();
    renderWithThemeProvider(<TestComponent />, { toggleTheme });

    screen.getByTestId('toggle').click();

    expect(toggleTheme).toHaveBeenCalled();
  });
});
