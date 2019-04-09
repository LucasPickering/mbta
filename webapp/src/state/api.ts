import axios, { AxiosRequestConfig } from 'axios';
import React from 'react';
import makeReducerContexts from './makeReducerContexts';

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

interface RequestConfig<QueryParams> extends AxiosRequestConfig {
  params?: QueryParams;
}

// We apply more restriction on the query params type, for safety!
export type RequestBuilder<Params, QueryParams = {}> = (
  params: Params
) => [string, RequestConfig<QueryParams>?];

const makeFetcher = <Params, Data>(requestBuilder: RequestBuilder<Params>) => (
  dispatch: React.Dispatch<ApiAction<Data>>,
  params: Params
) => {
  dispatch({ type: ApiActionType.Request });
  axios
    .get(...requestBuilder(params))
    .then(response => {
      dispatch({ type: ApiActionType.Success, data: response.data });
    })
    .catch(err => {
      dispatch({ type: ApiActionType.Error, error: err });
    });
};

export const makeApiKit = <Params, Data, QueryParams = {}>(
  requestBuilder: RequestBuilder<Params, QueryParams>
) => ({
  reducer: makeApiReducer<Data>(),
  fetcher: makeFetcher<Params, Data>(requestBuilder),
  contexts: makeReducerContexts<ApiState<Data>, ApiAction<Data>>(),
});
