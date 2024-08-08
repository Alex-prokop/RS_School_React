import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import useSearchTerm from '../hooks/useSearchTerm';

const TestComponent: React.FC<{ initialValue?: string }> = ({
  initialValue,
}) => {
  const [searchTerm, setSearchTerm] = useSearchTerm(
    'testKey',
    initialValue || ''
  );

  return (
    <div>
      <input
        data-testid="search-input"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <p data-testid="search-term">{searchTerm}</p>
    </div>
  );
};

describe('useSearchTerm', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should return initial value from localStorage if available', () => {
    localStorage.setItem('testKey', 'initialValue');

    render(<TestComponent />);

    expect(screen.getByTestId('search-term').textContent).toBe('initialValue');
  });

  it('should return default initial value if not in localStorage', () => {
    render(<TestComponent initialValue="defaultValue" />);

    expect(screen.getByTestId('search-term').textContent).toBe('defaultValue');
  });

  it('should update localStorage when searchTerm changes', () => {
    render(<TestComponent initialValue="defaultValue" />);

    fireEvent.change(screen.getByTestId('search-input'), {
      target: { value: 'newValue' },
    });

    expect(localStorage.getItem('testKey')).toBe('newValue');
    expect(screen.getByTestId('search-term').textContent).toBe('newValue');
  });
});
