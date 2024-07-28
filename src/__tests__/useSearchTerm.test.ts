// src/tests/useSearchTerm.test.ts
import { renderHook, act } from '@testing-library/react-hooks';
import useSearchTerm from '../hooks/useSearchTerm';

test('useSearchTerm hook', () => {
  const { result } = renderHook(() => useSearchTerm('searchTerm'));

  act(() => {
    result.current[1]('new search term');
  });

  expect(result.current[0]).toBe('new search term');
  expect(localStorage.getItem('searchTerm')).toBe('new search term');
});
