import * as React from 'react';
import { render } from '@testing-library/react';
import ErrorBoundary from '../components/ErrorBoundary';

const ProblemChild = () => {
  throw new Error('Error thrown from problem child');
};

test('renders error message when error is thrown', () => {
  const { getByText } = render(
    <ErrorBoundary>
      <ProblemChild />
    </ErrorBoundary>
  );

  expect(getByText(/Что-то пошло не так./i)).toBeInTheDocument();
  expect(
    getByText(
      /Пожалуйста, попробуйте перезагрузить страницу или повторите позже./i
    )
  ).toBeInTheDocument();
});
