import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import Layout from '../components/Layout';
import { useTheme } from '../hooks/useTheme';
import { useRouter } from 'next/router';

vi.mock('../hooks/useTheme', () => ({
  useTheme: vi.fn(),
}));

vi.mock('next/router', () => ({
  useRouter: vi.fn(),
}));

describe('Layout Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  it('renders Header, Footer, and children', () => {
    (useTheme as vi.Mock).mockReturnValue({ theme: 'light' });

    render(
      <Layout>
        <div>Child Content</div>
      </Layout>
    );

    expect(screen.getByRole('banner')).toBeInTheDocument(); // Header
    expect(screen.getByRole('contentinfo')).toBeInTheDocument(); // Footer
    expect(screen.getByText('Child Content')).toBeInTheDocument();
  });

  it('calls handleSearch with correct argument', () => {
    (useTheme as vi.Mock).mockReturnValue({ theme: 'light' });

    const mockPush = vi.fn();
    (useRouter as vi.Mock).mockReturnValue({ push: mockPush });

    render(
      <Layout>
        <div>Child Content</div>
      </Layout>
    );

    const searchInput = screen.getByPlaceholderText(/search by name or type/i);
    fireEvent.change(searchInput, { target: { value: 'test' } });
    fireEvent.click(screen.getByText(/search/i));

    expect(mockPush).toHaveBeenCalledWith('/?searchTerm=test&page=1');

    expect(localStorage.getItem('searchTerm')).toBe('test');
  });

  it('throws an error when throwError is called', () => {
    (useTheme as vi.Mock).mockReturnValue({ theme: 'light' });

    render(
      <Layout>
        <div>Child Content</div>
      </Layout>
    );

    expect(() => {
      fireEvent.click(screen.getByText(/throw error/i));
    }).toThrow('This is a test error');
  });

  it('applies theme to document.body', () => {
    (useTheme as vi.Mock).mockReturnValue({ theme: 'dark' });

    render(
      <Layout>
        <div>Child Content</div>
      </Layout>
    );

    expect(document.body.className).toBe('dark');
  });
});
