import { render } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import HomePage from '../app/page';

describe('HomePage Component', () => {
  it('renders error message when fetch fails', async () => {
    global.fetch = vi.fn(() => Promise.reject(new Error('Ошибка запроса')));

    const searchParams = { searchTerm: 'Earth', page: '1' };

    const result = await HomePage({ searchParams });

    const { getByText } = render(result);
    expect(getByText('Ошибка загрузки данных')).toBeInTheDocument();
  });
});
