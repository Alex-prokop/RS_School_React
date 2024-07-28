// import * as React from 'react';
// import { render, screen, fireEvent } from '@testing-library/react';
// import { Provider } from 'react-redux';
// import { BrowserRouter } from 'react-router-dom';
// import configureMockStore from 'redux-mock-store';
// import thunk from 'redux-thunk';
// import ResultList from '../components/ResultList';
// import { RootState } from '../store';
// import { AstronomicalObjectV2Base } from '../types';
// import { selectItem } from '../features/astronomicalObjectsSlice';
// import { ThemeProvider } from '../contexts/ThemeProvider';
// import { AnyAction } from 'redux';

// const middlewares = [thunk];
// const mockStore = configureMockStore<RootState, AnyAction>(middlewares);

// const mockData: AstronomicalObjectV2Base[] = [
//   { uid: '1', name: 'Earth', astronomicalObjectType: 'PLANET' },
//   { uid: '2', name: 'Mars', astronomicalObjectType: 'PLANET' },
// ];

// const mockInitialState: RootState = {
//   astronomicalObjects: {
//     selectedItems: [],
//     fullDetails: {},
//   },
//   astronomicalObjectsApi: {
//     queries: {},
//     mutations: {},
//     provided: {},
//     subscriptions: {},
//     config: {
//       online: true,
//       reducerPath: 'astronomicalObjectsApi',
//     },
//   } as any,
// };

// test('renders ResultList and handles selection', () => {
//   const store = mockStore(mockInitialState);
//   store.dispatch = jest.fn();

//   render(
//     <Provider store={store}>
//       <ThemeProvider>
//         <BrowserRouter>
//           <ResultList
//             searchTerm=""
//             page={1}
//             setPage={() => {}}
//             setTotalPages={() => {}}
//           />
//         </BrowserRouter>
//       </ThemeProvider>
//     </Provider>
//   );

//   mockData.forEach((item) => {
//     const element = screen.getByText(item.name);
//     expect(element).toBeInTheDocument();
//   });

//   const firstCheckbox = screen.getAllByRole('checkbox')[0];
//   fireEvent.click(firstCheckbox);

//   expect(store.dispatch).toHaveBeenCalledWith(selectItem(mockData[0]));
// });
