import { setupApiStore } from './setupApiStore';
import {
  astronomicalObjectsApi,
  useGetAstronomicalObjectsQuery,
  useGetAstronomicalObjectByIdQuery,
} from '../services/astronomicalObjectsApi';

describe('astronomicalObjectsApi', () => {
  const storeRef = setupApiStore(astronomicalObjectsApi);

  it('should fetch astronomical objects', async () => {
    const { result, waitForNextUpdate } = storeRef.renderHook(() =>
      useGetAstronomicalObjectsQuery({ name: 'Earth', page: 1, pageSize: 10 })
    );

    await waitForNextUpdate();

    expect(result.current.data).toBeDefined();
    expect(result.current.data?.astronomicalObjects.length).toBeGreaterThan(0);
  });

  it('should fetch an astronomical object by ID', async () => {
    const { result, waitForNextUpdate } = storeRef.renderHook(() =>
      useGetAstronomicalObjectByIdQuery('1')
    );

    await waitForNextUpdate();

    expect(result.current.data).toBeDefined();
    expect(result.current.data?.astronomicalObject).toHaveProperty('uid', '1');
  });
});
