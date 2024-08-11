import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ThrowErrorButton from '../components/ThrowErrorButton';
import React from 'react';
import { describe, it, expect, vi } from 'vitest';

describe('ThrowErrorButton Component', () => {
  it('renders the ThrowErrorButton', () => {
    render(<ThrowErrorButton throwError={() => {}} />);
    const button = screen.getByText('Throw Error');
    expect(button).toBeInTheDocument();
  });

  it('calls throwError when clicked', () => {
    const throwErrorMock = vi.fn();
    render(<ThrowErrorButton throwError={throwErrorMock} />);
    const button = screen.getByText('Throw Error');
    fireEvent.click(button);
    expect(throwErrorMock).toHaveBeenCalledTimes(1);
  });

  it('handles errors correctly', () => {
    const throwErrorMock = vi.fn(() => {
      throw new Error('Test Error');
    });
    const consoleError = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {});
    render(<ThrowErrorButton throwError={throwErrorMock} />);
    const button = screen.getByText('Throw Error');
    expect(() => {
      fireEvent.click(button);
    }).toThrow('Test Error');
    consoleError.mockRestore();
  });
});
