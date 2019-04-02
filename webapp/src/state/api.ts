import React from 'react';

import { makeReducerContext } from './reducerContext';

export interface ApiState<T> {
  loading: boolean;
  data?: T;
  error?: string; // TODO
}

export const defaultApiState: ApiState<any> = {
  loading: false,
  data: undefined,
  error: undefined,
};

export enum ApiActionType {
  Request = 'request',
  Success = 'success',
  Error = 'error',
}

export type ApiAction<T> =
  | { type: ApiActionType.Request }
  | { type: ApiActionType.Success; data: T }
  | { type: ApiActionType.Error; error: string };

// Makes a reducer for the given data type
export const makeApiReducer = <T>(): React.Reducer<
  ApiState<T>,
  ApiAction<T>
> => (state, action) => {
  switch (action.type) {
    case ApiActionType.Request:
      return {
        ...state,
        loading: true,
        data: undefined,
        error: undefined,
      };
    case ApiActionType.Success:
      return {
        ...state,
        loading: false,
        data: action.data,
      };
    case ApiActionType.Error:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
  }
};

export const makeApiContext = <T>() =>
  makeReducerContext<ApiState<T>, ApiAction<T>>();
