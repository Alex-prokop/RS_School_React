import React from 'react';
import { render, screen } from '@testing-library/react';
import Button from '../components/Button';

describe('Button component', () => {
  it('renders correctly', () => {
    render(<Button onClick={() => {}}>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });
});
