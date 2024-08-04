// import React from 'react';
// import { useGetAstronomicalObjectsQuery } from './path-to-api';

// const AstronomicalObjectsList = ({ page, pageSize, name, astronomicalObjectType, locationUid }) => {
//   const { data, error, isLoading } = useGetAstronomicalObjectsQuery({
//     page,
//     pageSize,
//     name,
//     astronomicalObjectType,
//     locationUid
//   });

//   if (error) {
//     return <div>Error: {error.message}</div>;
//   }

//   if (isLoading) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div>
//       {/* Ваш код для отображения данных */}
//       {data?.items.map((item) => (
//         <div key={item.uid}>{item.name}</div>
//       ))}
//     </div>
//   );
// };

// export default AstronomicalObjectsList;
