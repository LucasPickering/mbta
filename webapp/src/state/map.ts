import React from 'react';
import { Series, Station } from '../types';
import { mod } from '../util';
import makeReducerContexts from './makeReducerContexts';

export interface MapState {
  stations: Station[];
  intervals: Series;
  activeIndex: number;
  playing: boolean;
}

export const defaultMapState: Pick<
  MapState,
  Exclude<keyof MapState, 'stations' | 'intervals'>
> = {
  activeIndex: 0,
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
    case MapActionType.SetActiveIndex:
      return {
        ...state,
        activeIndex: mod(action.value, state.intervals.summary.length),
      };
    case MapActionType.DecrActiveIndex:
      // Defer to the SetActiveIndex handler
      return mapReducer(state, {
        type: MapActionType.SetActiveIndex,
        value: state.activeIndex - 1,
      });
    case MapActionType.IncrActiveIndex:
      // Defer to the SetActiveIndex handler
      const nextState = mapReducer(state, {
        type: MapActionType.SetActiveIndex,
        value: state.activeIndex + 1,
      });

      // If this is the last interval, stop playing
      if (nextState.activeIndex === state.intervals.summary.length - 1) {
        return {
          ...nextState,
          playing: false,
        };
      }

      return nextState;
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
