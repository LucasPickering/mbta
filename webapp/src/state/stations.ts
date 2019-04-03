import { makeApiKit, UrlBuilder } from '../state/api';
import { Station } from '../types';

const urlBuilder: UrlBuilder<{}> = () => '/api/stations';

export const {
  reducer: stationsReducer,
  fetcher: stationsFetcher,
  context: StationsContext,
} = makeApiKit<{}, Station[]>(urlBuilder);
