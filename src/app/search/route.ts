import { NextRequest, NextResponse } from 'next/server';
import { astronomicalObjectsApi } from '../../services/astronomicalObjectsApi';
import store from '../../store/index';

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const searchParams = Object.fromEntries(url.searchParams.entries());
  const { name = '', page = '1', pageSize = '10' } = searchParams;

  const result = await store.dispatch(
    astronomicalObjectsApi.endpoints.getAstronomicalObjects.initiate({
      name: name as string,
      page: parseInt(page as string, 10),
      pageSize: parseInt(pageSize as string, 10),
    })
  );

  if (result.error) {
    return NextResponse.json({ error: result.error }, { status: 500 });
  }

  return NextResponse.json(result.data);
}
