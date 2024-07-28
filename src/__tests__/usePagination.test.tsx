import React, { ReactNode } from 'react';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory, MemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { act } from 'react';
import usePagination from '../components/usePagination'; // Проверьте правильность пути

interface WrapperProps {
  children: ReactNode;
  history: MemoryHistory;
}

const Wrapper: React.FC<WrapperProps> = ({ children, history }) => (
  <Router location={history.location} navigator={history}>
    {children}
  </Router>
);

const TestComponent: React.FC = () => {
  const { page, setPage } = usePagination();
  return (
    <div>
      <span data-testid="page">{page}</span>
      <button onClick={() => setPage(page + 1)}>Next Page</button>
    </div>
  );
};

describe('usePagination', () => {
  let history: MemoryHistory;

  beforeEach(() => {
    history = createMemoryHistory();
  });

  it('should initialize page from URL parameter', async () => {
    history.push('/?page=2');
    render(
      <Wrapper history={history}>
        <TestComponent />
      </Wrapper>
    );

    await new Promise((r) => setTimeout(r, 100)); // Небольшая задержка для асинхронных эффектов
    console.log('Page:', screen.getByTestId('page').textContent); // Логирование
    expect(screen.getByTestId('page')).toHaveTextContent('2');
  });

  it('should update URL when page changes', async () => {
    render(
      <Wrapper history={history}>
        <TestComponent />
      </Wrapper>
    );

    await act(async () => {
      screen.getByText('Next Page').click();
    });

    await new Promise((r) => setTimeout(r, 100)); // Небольшая задержка для асинхронных эффектов
    console.log('History location:', history.location.search); // Логирование
    expect(history.location.search).toBe('?page=2');
  });
});
