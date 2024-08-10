'use client';

import React from 'react';
import ErrorBoundary from '../components/ErrorBoundary';

export default function GlobalError() {
  return (
    <html lang="en">
      <body>
        <ErrorBoundary>
          <h1>Something went wrong!</h1>
        </ErrorBoundary>
      </body>
    </html>
  );
}
