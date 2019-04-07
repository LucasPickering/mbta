import axios from 'axios';
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
  Request,
  Success,
  Error,
}

export type ApiAction<T> =
  | { type: ApiActionType.Request }
  | { type: ApiActionType.Success; data: T }
  | { type: ApiActionType.Error; error: string };

// Makes a reducer for the given data type
const makeApiReducer = <T>(): React.Reducer<ApiState<T>, ApiAction<T>> => (
  state,
  action
) => {
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

export type UrlBuilder<Params> = (params: Params) => string;

const makeFetcher = <Params, Data>(urlBuilder: UrlBuilder<Params>) => (
  dispatch: React.Dispatch<ApiAction<Data>>,
  params: Params
) => {
  dispatch({ type: ApiActionType.Request });
  axios
    .get(urlBuilder(params))
    .then(response => {
      dispatch({ type: ApiActionType.Success, data: response.data });
    })
    .catch(err => {
      dispatch({ type: ApiActionType.Error, error: err });
    });
};

export const makeApiKit = <Params, Data>(urlBuilder: UrlBuilder<Params>) => ({
  reducer: makeApiReducer<Data>(),
  fetcher: makeFetcher<Params, Data>(urlBuilder),
  context: makeReducerContext<ApiState<Data>, ApiAction<Data>>(),
});
