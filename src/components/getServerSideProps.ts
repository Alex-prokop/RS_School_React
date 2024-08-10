// import { GetServerSideProps } from 'next';
// import { wrapper } from '../store';
// import { astronomicalObjectsApi } from '../services/astronomicalObjectsApi';

// export const getServerSideProps: GetServerSideProps =
//   wrapper.getServerSideProps((store) => async (context) => {
//     console.log('Fetching data on the server');

//     const pageQuery = context.query.page || '1';
//     const searchTerm = context.query.searchTerm || '';

//     const searchTermString = Array.isArray(searchTerm)
//       ? searchTerm[0]
//       : searchTerm;

//     const page = Array.isArray(pageQuery)
//       ? parseInt(pageQuery[0], 10)
//       : parseInt(pageQuery, 10);
//     const pageNumber = isNaN(page) ? 1 : page;

//     try {
//       const response = await store.dispatch(
//         astronomicalObjectsApi.endpoints.getAstronomicalObjects.initiate({
//           name: searchTermString,
//           page: pageNumber,
//           pageSize: 10,
//         })
//       );

//       if (!response.data) {
//         throw new Error('API did not return data');
//       }

//       return {
//         props: {
//           initialData: response.data,
//           selectedItems: [],
//         },
//       };
//     } catch (error) {
//       console.error('Error fetching data:', error);
//       return {
//         props: {
//           initialData: {
//             page: { number: 0, size: 10, totalElements: 0, totalPages: 0 },
//             astronomicalObjects: [],
//           },
//           selectedItems: [],
//         },
//       };
//     }
//   });
