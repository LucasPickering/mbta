import { DataTransformer, makeApiKit, RequestBuilder } from '../state/api';

interface ApiData {
  min_date: Date;
  max_date: Date;
}

const requestBuilder: RequestBuilder<{}> = () => ['/api/daterange'];

const dataTransformer: DataTransformer<ApiData, [Date, Date]> = data => [
  data.min_date,
  data.max_date,
];

export const {
  reducer: dateRangeReducer,
  fetcher: dateRangeFetcher,
  contexts: [DateRangeStateContext, DateRangeDispatchContext],
} = makeApiKit<{}, ApiData, [Date, Date]>(requestBuilder, dataTransformer);
