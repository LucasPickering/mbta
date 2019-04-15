import { makeApiKit, RequestBuilder } from '../state/api';
import { DateRange } from '../types';

const requestBuilder: RequestBuilder<{}> = () => ['/api/daterange'];

export const {
  reducer: dateRangeReducer,
  fetcher: dateRangeFetcher,
  contexts: [DateRangeStateContext, DateRangeDispatchContext],
} = makeApiKit<{}, DateRange>(requestBuilder);
