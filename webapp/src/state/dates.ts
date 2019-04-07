import { parse } from 'date-fns';
import React from 'react';
import { DateWildcard, DayOfWeek } from '../types';
import { makeReducerContext } from './reducerContext';

// TODO: Load this from the API
export const VALID_DATE_RANGE: [Date, Date] = [
  parse('2013-01-01', 'yyyy-MM-dd', new Date()),
  parse('2018-12-31', 'yyyy-MM-dd', new Date()),
];

export interface DatesState {
  daysOfWeek: DayOfWeek[];
  dateRange: [Date?, Date?];
  wildcards: DateWildcard[];
}

export const defaultDatesState: DatesState = {
  daysOfWeek: [],
  dateRange: [undefined, undefined],
  wildcards: [],
};

export enum DatesActionType {
  SetDaysOfWeek,
  SetDateRange,
  SetDateRangeStart,
  SetDateRangeEnd,
  SetWildcards,
}

export type DatesAction =
  | { type: DatesActionType.SetDaysOfWeek; value: DayOfWeek[] }
  | { type: DatesActionType.SetDateRange; value: [Date?, Date?] }
  | { type: DatesActionType.SetDateRangeStart; value?: Date }
  | { type: DatesActionType.SetDateRangeEnd; value?: Date }
  | { type: DatesActionType.SetWildcards; value: DateWildcard[] };

export const datesReducer: React.Reducer<DatesState, DatesAction> = (
  state,
  action
) => {
  switch (action.type) {
    case DatesActionType.SetDaysOfWeek:
      return {
        ...state,
        daysOfWeek: action.value,
      };
    case DatesActionType.SetDateRange:
      return {
        ...state,
        dateRange: action.value,
      };
    case DatesActionType.SetDateRangeStart:
      const [, endDate] = state.dateRange;
      return {
        ...state,
        dateRange: [action.value, endDate],
      };
    case DatesActionType.SetDateRangeEnd:
      const [startDate] = state.dateRange;
      return {
        ...state,
        dateRange: [startDate, action.value],
      };
    case DatesActionType.SetWildcards:
      return {
        ...state,
        wildcards: action.value,
      };
  }
};

export const DatesContext = makeReducerContext<DatesState, DatesAction>();
