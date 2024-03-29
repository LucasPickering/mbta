import { format } from 'date-fns';
import { makeApiKit, RequestBuilder } from '../state/api';
import { Series } from '../types';
import { DatesState } from './dates';

const DATE_FORMAT = 'yyyy-MM-dd';

interface QueryParams {
  lines?: string;
  days_of_week?: string;
  start_date?: string;
  end_date?: string;
}

const requestBuilder: RequestBuilder<DatesState, QueryParams> = ({
  lines,
  daysOfWeek,
  dateRange: [startDate, endDate],
}) => {
  const params: QueryParams = {};

  params.lines = lines.join(',');

  params.days_of_week = daysOfWeek.join(',');

  if (startDate) {
    params.start_date = format(startDate, DATE_FORMAT);
  }

  if (endDate) {
    params.end_date = format(endDate, DATE_FORMAT);
  }

  return ['/api/intervals', { params }];
};

export const {
  reducer: intervalsReducer,
  fetcher: intervalsFetcher,
  contexts: [IntervalsStateContext, IntervalsDispatchContext],
} = makeApiKit<DatesState, Series, Series, QueryParams>(requestBuilder);
