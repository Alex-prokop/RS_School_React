import React from 'react';

import MainPage from '../components/MainPage';

export default async function HomePage({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) {
  const pageQuery = searchParams.page || '1';
  const searchTerm = searchParams.searchTerm || '';

  const searchTermString = Array.isArray(searchTerm)
    ? searchTerm[0]
    : searchTerm;

  const page = Array.isArray(pageQuery)
    ? parseInt(pageQuery[0], 10)
    : parseInt(pageQuery, 10);
  const pageNumber = isNaN(page) ? 1 : page;

  try {
    const response = await fetch(
      `https://stapi.co/api/v2/rest/astronomicalObject/search?name=${searchTermString}&pageNumber=${pageNumber - 1}&pageSize=10`,
      {
        method: searchTerm ? 'POST' : 'GET',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: searchTerm
          ? new URLSearchParams({ name: searchTermString }).toString()
          : undefined,
      }
    );

    if (!response.ok) {
      throw new Error(`Ошибка запроса: ${response.status}`);
    }

    const data = await response.json();

    if (typeof data !== 'object') {
      throw new Error('Ответ сервера не является JSON');
    }

    return <MainPage initialData={data} />;
  } catch (error) {
    console.error('Ошибка получения данных:', error);
    return <p>Ошибка загрузки данных</p>;
  }
}
1;
