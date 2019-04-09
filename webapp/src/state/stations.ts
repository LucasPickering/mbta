import { makeApiKit, RequestBuilder } from '../state/api';
import { Station } from '../types';

const requestBuilder: RequestBuilder<{}> = () => ['/api/stations'];

export const {
  reducer: stationsReducer,
  fetcher: stationsFetcher,
  contexts: [StationsStateContext, StationsDispatchContext],
} = makeApiKit<{}, Station[]>(requestBuilder);
