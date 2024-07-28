// // src/mocks/handlers.ts
// import { rest } from 'msw';

// export const handlers = [
//   rest.get(
//     'https://stapi.co/api/v2/rest/astronomicalObject',
//     (req: any, res: any, ctx: any) => {
//       return res(
//         ctx.json({
//           astronomicalObject: {
//             uid: '1',
//             name: 'Test Object',
//             astronomicalObjectType: 'PLANET',
//             location: {
//               uid: '2',
//               name: 'Test Location',
//               astronomicalObjectType: 'STAR_SYSTEM',
//               location: {
//                 uid: '3',
//                 name: 'Parent Location',
//               },
//             },
//             astronomicalObjects: [
//               {
//                 uid: '4',
//                 name: 'Sub Object',
//                 astronomicalObjectType: 'MOON',
//               },
//             ],
//           },
//         })
//       );
//     }
//   ),
// ];
