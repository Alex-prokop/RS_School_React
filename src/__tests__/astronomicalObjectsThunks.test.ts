// import configureStore from 'redux-mock-store';
// import thunk from 'redux-thunk';
// import fetchMock from 'fetch-mock';
// import { fetchFullDetails } from '../features/astronomicalObjectsSlice';
// import { AstronomicalObjectV2FullResponse } from '../types';

// const middlewares = [thunk];
// const mockStore = configureStore(middlewares);

// describe('astronomicalObjectsSlice thunks', () => {
//   afterEach(() => {
//     fetchMock.restore();
//   });

//   it('dispatches fetchFullDetails and stores result on success', async () => {
//     const uid = '1';
//     const mockResponse: AstronomicalObjectV2FullResponse = {
//       astronomicalObject: {
//         uid: '1',
//         name: 'Earth',
//         astronomicalObjectType: 'PLANET',
//         location: {
//           uid: '2',
//           name: 'Solar System',
//         },
//         astronomicalObjects: [],
//       },
//     };

//     fetchMock.getOnce(
//       `https://stapi.co/api/v2/rest/astronomicalObject?uid=${uid}`,
//       {
//         body: mockResponse,
//         headers: { 'content-type': 'application/json' },
//       }
//     );

//     const expectedActions = [
//       {
//         type: fetchFullDetails.pending.type,
//         meta: {
//           arg: uid,
//           requestId: expect.any(String),
//           requestStatus: expect.any(String),
//         },
//       },
//       {
//         type: fetchFullDetails.fulfilled.type,
//         payload: { uid, data: mockResponse },
//         meta: {
//           arg: uid,
//           requestId: expect.any(String),
//           requestStatus: expect.any(String),
//         },
//       },
//     ];

//     const store = mockStore({});

//     await store.dispatch(fetchFullDetails(uid) as any);
//     const actions = store.getActions();
//     expect(actions).toEqual(expectedActions);
//   });

//   it('dispatches fetchFullDetails and handles error', async () => {
//     const uid = '1';
//     fetchMock.getOnce(
//       `https://stapi.co/api/v2/rest/astronomicalObject?uid=${uid}`,
//       {
//         throws: new Error('API Error'),
//       }
//     );

//     const expectedActions = [
//       {
//         type: fetchFullDetails.pending.type,
//         meta: {
//           arg: uid,
//           requestId: expect.any(String),
//           requestStatus: expect.any(String),
//         },
//       },
//       {
//         type: fetchFullDetails.rejected.type,
//         error: { message: 'API Error', name: 'Error' },
//         meta: {
//           arg: uid,
//           requestId: expect.any(String),
//           requestStatus: expect.any(String),
//         },
//       },
//     ];

//     const store = mockStore({});

//     await store.dispatch(fetchFullDetails(uid) as any);
//     const actions = store.getActions();
//     expect(actions).toEqual(expectedActions);
//   });
// });
