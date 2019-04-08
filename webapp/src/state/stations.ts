import { makeApiKit, RequestBuilder } from '../state/api';
import { Station } from '../types';

const requestBuilder: RequestBuilder<{}> = () => ['/api/stations'];

export const {
  reducer: stationsReducer,
  fetcher: stationsFetcher,
  context: StationsContext,
} = makeApiKit<{}, Station[]>(requestBuilder);
