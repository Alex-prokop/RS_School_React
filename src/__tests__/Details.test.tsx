import * as React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import Details from '../components/Details';
import { setupStore } from '../store';
import { setupServer } from 'msw/node';
import { rest } from 'msw';

const store = setupStore();

const server = setupServer(
  rest.get(
    'https://stapi.co/api/v2/rest/astronomicalObject',
    (req, res, ctx) => {
      return res(
        ctx.json({
          astronomicalObject: {
            uid: '1',
            name: 'Test Object',
            astronomicalObjectType: 'PLANET',
            location: {
              uid: '2',
              name: 'Test Location',
              astronomicalObjectType: 'STAR_SYSTEM',
              location: {
                uid: '3',
                name: 'Parent Location',
              },
            },
            astronomicalObjects: [
              {
                uid: '4',
                name: 'Sub Object',
                astronomicalObjectType: 'MOON',
              },
            ],
          },
        })
      );
    }
  )
);

describe('Details', () => {
  beforeAll(() => {
    server.listen();
  });

  afterEach(() => {
    server.resetHandlers();
  });

  afterAll(() => {
    server.close();
  });

  test('renders loading state', () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/?details=1']}>
          <Routes>
            <Route path="/" element={<Details />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );
    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
  });

  test('renders error state', async () => {
    server.use(
      rest.get(
        'https://stapi.co/api/v2/rest/astronomicalObject',
        (req, res, ctx) => {
          return res(
            ctx.status(500),
            ctx.json({ message: 'Internal Server Error' })
          );
        }
      )
    );

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/?details=1']}>
          <Routes>
            <Route path="/" element={<Details />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    expect(await screen.findByText(/Error:/i)).toBeInTheDocument();
  });

  test('renders data correctly', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/?details=1']}>
          <Routes>
            <Route path="/" element={<Details />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    expect(await screen.findByText('Test Object')).toBeInTheDocument();
    expect(screen.getByText(/Type: PLANET/i)).toBeInTheDocument();
    expect(screen.getByText(/Location/i)).toBeInTheDocument();
    expect(screen.getByText(/Test Location/i)).toBeInTheDocument();
    expect(screen.getByText(/STAR_SYSTEM/i)).toBeInTheDocument();
    expect(screen.getByText(/Parent Location/i)).toBeInTheDocument();
    expect(screen.getByText(/Contained Objects/i)).toBeInTheDocument();
    expect(screen.getByText(/Sub Object/i)).toBeInTheDocument();
    expect(screen.getByText(/MOON/i)).toBeInTheDocument();
  });

  test('handles close button', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/?details=1']}>
          <Routes>
            <Route path="/" element={<Details />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    fireEvent.click(await screen.findByRole('button', { name: /✕/i }));
    expect(window.location.search).toBe('');
  });
});
