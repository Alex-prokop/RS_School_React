import React from 'react';
import { render } from '@testing-library/react';
import Footer from '../components/Footer';

describe('Footer component', () => {
  it('renders correctly', () => {
    const { container } = render(<Footer />);
    expect(container.querySelector('footer')).toBeInTheDocument();
  });
});
