import React from 'react';

import { DateWildcard, DayOfWeek } from '../types';
import { makeReducerContext } from './reducerContext';

export interface DatesState {
  daysOfWeek: DayOfWeek[];
  dateRange?: [Date, Date];
  wildcards: DateWildcard[];
}

export const defaultDatesState: DatesState = {
  daysOfWeek: [],
  dateRange: undefined,
  wildcards: [],
};

export enum DatesActionType {
  SetDaysOfWeek,
  SetDateRange,
  SetWildcards,
}

export type DatesAction =
  | { type: DatesActionType.SetDaysOfWeek; value: DayOfWeek[] }
  | { type: DatesActionType.SetDateRange; value: [Date, Date] }
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
    case DatesActionType.SetWildcards:
      return {
        ...state,
        wildcards: action.value,
      };
  }
};

export const DatesContext = makeReducerContext<DatesState, DatesAction>();
