import { makeApiKit, UrlBuilder } from '../state/api';
import { Series } from '../types';

const urlBuilder: UrlBuilder<{}> = () => '/api/intervals';

export const {
  reducer: intervalsReducer,
  fetcher: intervalsFetcher,
  context: IntervalsContext,
} = makeApiKit<{}, Series>(urlBuilder);
