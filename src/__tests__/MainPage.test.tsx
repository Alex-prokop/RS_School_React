import * as React from 'react';
import { render } from '@testing-library/react';
import MainPage from '../components/MainPage';

test('renders MainPage component', () => {
  const { container } = render(<MainPage searchTerm="" />);
  expect(container.firstChild).toHaveClass('main-page');
});
