import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../store';
import { ThemeProvider } from '../contexts/ThemeProvider';
import {
  useGetAstronomicalObjectsQuery,
  useGetAstronomicalObjectByIdQuery,
} from '../services/astronomicalObjectsApi';

const renderWithProviders = (ui: React.ReactElement) => {
  return render(
    <Provider store={store}>
      <ThemeProvider>{ui}</ThemeProvider>
    </Provider>
  );
};

const ListComponent: React.FC = () => {
  const { data, error, isLoading } = useGetAstronomicalObjectsQuery({
    page: 1,
    pageSize: 10,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error</div>;

  return <div>{data?.astronomicalObjects.length} objects fetched</div>;
};

const DetailComponent: React.FC<{ id: string }> = ({ id }) => {
  const { data, error, isLoading } = useGetAstronomicalObjectByIdQuery(id);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error</div>;

  return <div>Object: {data?.astronomicalObject.name}</div>;
};

test('fetches astronomical objects', async () => {
  renderWithProviders(<ListComponent />);

  await waitFor(() => screen.getByText(/objects fetched/i));

  expect(screen.getByText(/objects fetched/i)).toBeInTheDocument();
});

test('fetches astronomical object by ID', async () => {
  renderWithProviders(<DetailComponent id="some-uid" />);

  await waitFor(() => screen.getByText(/Object:/i));

  expect(screen.getByText(/Object:/i)).toBeInTheDocument();
});
