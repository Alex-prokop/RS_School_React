// import { configureStore } from '@reduxjs/toolkit';
// import { Provider } from 'react-redux';
// import { renderHook } from '@testing-library/react-hooks';
// import React, { ReactNode } from 'react';

// export const setupApiStore = (api: any) => {
//   const store = configureStore({
//     reducer: {
//       [api.reducerPath]: api.reducer,
//     },
//     middleware: (getDefaultMiddleware) =>
//       getDefaultMiddleware().concat(api.middleware),
//   });

//   const Wrapper = ({ children }: { children?: ReactNode }) => (
//     <Provider store={store}>{children}</Provider>
//   );

//   return {
//     store,
//     renderHook: (hook: any) => renderHook(hook, { wrapper: Wrapper }),
//   };
// };
