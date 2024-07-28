import * as React from 'react';
import { render } from '@testing-library/react';
import NotFound from '../components/NotFound';

test('renders NotFound component', () => {
  const { getByText } = render(<NotFound />);
  expect(getByText(/404 - Page Not Found/i)).toBeInTheDocument();
  expect(
    getByText(/The page you are looking for does not exist./i)
  ).toBeInTheDocument();
});
