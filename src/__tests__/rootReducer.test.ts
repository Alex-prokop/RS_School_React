// import { combineReducers } from '@reduxjs/toolkit';
// import rootReducer from '../store/rootReducer';
// import { selectItem, unselectItem } from '../features/astronomicalObjectsSlice';
// import { astronomicalObjectsApi } from '../services/astronomicalObjectsApi';

// describe('rootReducer', () => {
//   it('should initialize the state with combined reducers', () => {
//     const initialState = rootReducer(undefined, { type: '@@INIT' });

//     expect(initialState).toHaveProperty('astronomicalObjects');
//     expect(initialState).toHaveProperty(astronomicalObjectsApi.reducerPath);
//   });

//   it('should handle selectItem action', () => {
//     const initialState = {
//       astronomicalObjects: {
//         selectedItems: [],
//         currentItem: undefined,
//         fullDetails: {},
//       },
//       [astronomicalObjectsApi.reducerPath]: undefined,
//     };

//     const item = {
//       uid: '1',
//       name: 'Earth',
//       astronomicalObjectType: 'PLANET' as const,
//     };
//     const state = rootReducer(initialState, selectItem(item));

//     expect(state.astronomicalObjects.selectedItems).toContainEqual(item);
//   });

//   it('should handle unselectItem action', () => {
//     const initialState = {
//       astronomicalObjects: {
//         selectedItems: [
//           {
//             uid: '1',
//             name: 'Earth',
//             astronomicalObjectType: 'PLANET' as const,
//           },
//         ],
//         currentItem: undefined,
//         fullDetails: {},
//       },
//       [astronomicalObjectsApi.reducerPath]: undefined,
//     };

//     const state = rootReducer(initialState, unselectItem('1'));

//     expect(state.astronomicalObjects.selectedItems).not.toContainEqual({
//       uid: '1',
//       name: 'Earth',
//       astronomicalObjectType: 'PLANET' as const,
//     });
//   });
// });
