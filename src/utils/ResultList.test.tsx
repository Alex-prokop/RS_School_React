// import React from 'react';
// import { render, screen, waitFor, act } from '@testing-library/react';
// import '@testing-library/jest-dom';
// import ResultList from '../components/ResultList';
// import { MemoryRouter } from 'react-router-dom';

// describe('ResultList Component', () => {
//   test('displays loading message', () => {
//     render(
//       <MemoryRouter>
//         <ResultList searchTerm="mars" />
//       </MemoryRouter>
//     );

//     expect(screen.getByText('Loading...')).toBeInTheDocument();
//   });

//   test('displays error message on fetch failure', async () => {
//     global.fetch = jest.fn(() =>
//       Promise.reject(new Error('Network response was not ok'))
//     ) as jest.Mock;

//     await act(async () => {
//       render(
//         <MemoryRouter>
//           <ResultList searchTerm="mars" />
//         </MemoryRouter>
//       );
//     });

//     await waitFor(() =>
//       expect(
//         screen.getByText('Error: Network response was not ok')
//       ).toBeInTheDocument()
//     );
//   });

//   test('displays no results message when no data is found', async () => {
//     global.fetch = jest.fn(() =>
//       Promise.resolve({
//         ok: true,
//         json: () =>
//           Promise.resolve({
//             astronomicalObjects: [],
//             page: { totalElements: 0 },
//           }),
//       })
//     ) as jest.Mock;

//     await act(async () => {
//       render(
//         <MemoryRouter>
//           <ResultList searchTerm="nonexistent" />
//         </MemoryRouter>
//       );
//     });

//     await waitFor(() =>
//       expect(screen.getByText('No results found')).toBeInTheDocument()
//     );
//   });
// });
