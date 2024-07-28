import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import useSearchTerm from '../hooks/useSearchTerm';

describe('useSearchTerm', () => {
  const key = 'searchTermKey';

  beforeEach(() => {
    localStorage.clear();
  });

  function TestComponent({
    hook,
  }: {
    hook: () => readonly [string, React.Dispatch<React.SetStateAction<string>>];
  }) {
    const [searchTerm, setSearchTerm] = hook();
    return (
      <div>
        <span>{searchTerm}</span>
        <button onClick={() => setSearchTerm('newValue')}>Change</button>
      </div>
    );
  }

  it('should initialize with the value from localStorage', () => {
    localStorage.setItem(key, 'initialValue');
    const { getByText } = render(
      <TestComponent hook={() => useSearchTerm(key)} />
    );

    expect(getByText('initialValue')).toBeInTheDocument();
  });

  it('should initialize with the provided initialValue if localStorage is empty', () => {
    const { getByText } = render(
      <TestComponent hook={() => useSearchTerm(key, 'defaultValue')} />
    );

    expect(getByText('defaultValue')).toBeInTheDocument();
  });

  it('should update localStorage when the searchTerm changes', () => {
    const { getByText } = render(
      <TestComponent hook={() => useSearchTerm(key)} />
    );
    const button = getByText('Change');

    fireEvent.click(button);

    expect(localStorage.getItem(key)).toBe('newValue');
  });

  it('should return the updated searchTerm', () => {
    const { getByText } = render(
      <TestComponent hook={() => useSearchTerm(key)} />
    );
    const button = getByText('Change');

    fireEvent.click(button);

    expect(getByText('newValue')).toBeInTheDocument();
  });
});
