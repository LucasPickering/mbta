import React from 'react';
import { DateWildcard, DayOfWeek, Line } from '../types';
import makeReducerContexts from './makeReducerContexts';

export interface DatesState {
  validDateRange: [Date, Date];
  lines: Line[];
  daysOfWeek: DayOfWeek[];
  dateRange: [Date?, Date?];
  wildcards: DateWildcard[]; // Unused atm
}

export const defaultDatesState: Pick<
  DatesState,
  Exclude<keyof DatesState, 'validDateRange'>
> = {
  // TS doesn't have a good way to get all values of an enum. RIP
  lines: [Line.Blue, Line.Green, Line.Orange, Line.Red, Line.Silver],
  daysOfWeek: [
    DayOfWeek.Sunday,
    DayOfWeek.Monday,
    DayOfWeek.Tuesday,
    DayOfWeek.Wednesday,
    DayOfWeek.Thursday,
    DayOfWeek.Friday,
    DayOfWeek.Saturday,
  ],
  dateRange: [undefined, undefined],
  wildcards: [],
};

export enum DatesActionType {
  SetLines,
  SetDaysOfWeek,
  SetDateRange,
  SetDateRangeStart,
  SetDateRangeEnd,
  SetWildcards,
}

export type DatesAction =
  | { type: DatesActionType.SetLines; value: Line[] }
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
    case DatesActionType.SetLines:
      return {
        ...state,
        lines: action.value,
      };
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

export const [DatesStateContext, DatesDispatchContext] = makeReducerContexts<
  DatesState,
  DatesAction
>();
