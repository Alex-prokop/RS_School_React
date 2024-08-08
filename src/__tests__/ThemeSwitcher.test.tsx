import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ThemeSwitcher from '../components/ThemeSwitcher';
import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { useTheme } from '../hooks/useTheme';

vi.mock('../hooks/useTheme');

describe('ThemeSwitcher Component', () => {
  it('renders the ThemeSwitcher', () => {
    (useTheme as jest.Mock).mockReturnValue({
      theme: 'light',
      toggleTheme: vi.fn(),
    });

    render(<ThemeSwitcher />);
    const button = screen.getByText('Switch to dark theme');
    expect(button).toBeInTheDocument();
  });

  it('calls toggleTheme when clicked', () => {
    const toggleThemeMock = vi.fn();
    (useTheme as jest.Mock).mockReturnValue({
      theme: 'light',
      toggleTheme: toggleThemeMock,
    });

    render(<ThemeSwitcher />);
    const button = screen.getByText('Switch to dark theme');
    fireEvent.click(button);
    expect(toggleThemeMock).toHaveBeenCalledTimes(1);
  });

  it('displays the correct theme text', () => {
    (useTheme as jest.Mock).mockReturnValueOnce({
      theme: 'dark',
      toggleTheme: vi.fn(),
    });

    render(<ThemeSwitcher />);
    const button = screen.getByText('Switch to light theme');
    expect(button).toBeInTheDocument();
  });
});
