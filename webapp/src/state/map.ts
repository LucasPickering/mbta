import { isEmpty } from 'lodash-es';
import React from 'react';
import { Series, Station } from '../types';
import { mod } from '../util';
import makeReducerContexts from './makeReducerContexts';

export interface MapState {
  stations: Station[];
  // Will be undefined if we haven't loaded any data yet
  data?: {
    intervals: Series;
    // Sorted array of all times in the data
    times: number[];
    // Will be undefined if we have loaded data but it's empty
    activeInterval?: {
      index: number; // Only used internally to go forward/back
      time: number;
    };
  };
  playing: boolean;
}

export const defaultMapState: Pick<
  MapState,
  Exclude<keyof MapState, 'stations'>
> = {
  data: undefined,
  playing: false,
};

export enum MapActionType {
  SetData,
  SetActiveIndex,
  DecrActiveIndex,
  IncrActiveIndex,
  SetPlaying,
  TogglePlaying,
}

export type MapAction =
  | { type: MapActionType.SetData; value?: Series }
  | { type: MapActionType.SetActiveIndex; value: number }
  | { type: MapActionType.DecrActiveIndex }
  | { type: MapActionType.IncrActiveIndex }
  | { type: MapActionType.SetPlaying; value: boolean }
  | { type: MapActionType.TogglePlaying };

export const mapReducer: React.Reducer<MapState, MapAction> = (
  state,
  action
) => {
  switch (action.type) {
    case MapActionType.SetData:
      if (action.value) {
        // Get all the times that appear in the data, in a sorted array
        const times = Object.keys(action.value.summary)
          .map(time => parseInt(time, 10))
          // JS sorts numbers lexicographically by default... ecks dee
          .sort((a, b) => a - b);

        // If the data is empty, we can't have an active interval
        const activeInterval = isEmpty(times)
          ? undefined
          : { index: 0, time: times[0] };

        return {
          ...state,
          data: {
            intervals: action.value,
            times,
            activeInterval,
          },
          playing: false,
        };
      }
      return {
        ...state,
        data: undefined,
        playing: false,
      };

    case MapActionType.SetActiveIndex:
      // Only set the index if we have non-empty data
      if (state.data && !isEmpty(state.data.times)) {
        const activeIndex = mod(action.value, state.data.times.length);
        return {
          ...state,
          data: {
            ...state.data,
            activeInterval: {
              index: activeIndex,
              time: state.data.times[activeIndex],
            },
          },
        };
      }

      return state;

    case MapActionType.DecrActiveIndex:
      // Defer to the SetActiveIndex handler
      return state.data && state.data.activeInterval
        ? mapReducer(state, {
            type: MapActionType.SetActiveIndex,
            value: state.data.activeInterval.index - 1,
          })
        : state;

    case MapActionType.IncrActiveIndex:
      // Defer to the SetActiveIndex handler
      if (state.data && state.data.activeInterval) {
        let nextState = mapReducer(state, {
          type: MapActionType.SetActiveIndex,
          value: state.data.activeInterval.index + 1,
        });

        // If this is the last interval, stop playing
        if (
          nextState.data!.activeInterval!.index ===
          state.data.times.length - 1
        ) {
          nextState = {
            ...nextState,
            playing: false,
          };
        }

        return nextState;
      }
      return state;

    case MapActionType.SetPlaying:
      return {
        ...state,
        playing: action.value,
      };

    case MapActionType.TogglePlaying:
      return {
        ...state,
        playing: !state.playing,
      };
  }
};

export const [MapStateContext, MapDispatchContext] = makeReducerContexts<
  MapState,
  MapAction
>();
