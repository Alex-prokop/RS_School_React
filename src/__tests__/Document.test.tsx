import React from 'react';
import { renderToString } from 'react-dom/server';
import Document from '../app/_document';
import { vi } from 'vitest';

vi.mock('next/document', () => ({
  __esModule: true,
  Html: ({ children, lang }: { children: React.ReactNode; lang: string }) => (
    <html lang={lang}>{children}</html>
  ),
  Head: () => <head />,
  Main: () => <main />,
  NextScript: () => <script />,
}));

describe('Document', () => {
  it('renders Html, Head, Main, and NextScript components', () => {
    const htmlString = renderToString(<Document />);
    expect(htmlString).toContain('<html');
    expect(htmlString).toContain('<head');
    expect(htmlString).toContain('<main');
    expect(htmlString).toContain('<script');
  });

  it('sets the language attribute to "en" on the Html element', () => {
    const htmlString = renderToString(<Document />);
    expect(htmlString).toContain('<html lang="en"');
  });
});
