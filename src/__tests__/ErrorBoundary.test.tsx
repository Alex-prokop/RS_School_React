// ErrorBoundary.test.tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, it, expect } from 'vitest';
import ErrorBoundary from '../components/ErrorBoundary';

describe('ErrorBoundary Component', () => {
  it('renders children without error', () => {
    render(
      <ErrorBoundary>
        <div>Child Component</div>
      </ErrorBoundary>
    );

    expect(screen.getByText('Child Component')).toBeInTheDocument();
  });

  it('catches an error and displays the error message', () => {
    const ThrowError = () => {
      throw new Error('Test error');
    };

    render(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>
    );

    expect(screen.getByText('Что-то пошло не так.')).toBeInTheDocument();
    expect(
      screen.getByText(
        'Пожалуйста, попробуйте перезагрузить страницу или повторите позже.'
      )
    ).toBeInTheDocument();
    expect(screen.getByText(/Error: Test error/)).toBeInTheDocument();
  });

  it('displays the error details when an error is caught', () => {
    const ThrowError = () => {
      throw new Error('Test error');
    };

    render(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>
    );

    expect(screen.getByText('Что-то пошло не так.')).toBeInTheDocument();
    expect(
      screen.getByText(
        'Пожалуйста, попробуйте перезагрузить страницу или повторите позже.'
      )
    ).toBeInTheDocument();
    expect(screen.getByText(/Error: Test error/)).toBeInTheDocument();
  });
});
