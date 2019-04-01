import React from 'react';

import data from '../data/composite.json';
import { mod } from '../util';
import { Series } from '../types';

export interface MapState {
  data: Series;
  activeIndex: number;
  playing: boolean;
}

export const defaultMapState: MapState = {
  data: data.series1, // TODO
  activeIndex: 0,
  playing: false,
};

export enum MapActionType {
  SetData = 'setData',
  SetActiveIndex = 'setActiveIndex',
  DecrActiveIndex = 'decrActiveIndex',
  IncrActiveIndex = 'incrActiveIndex',
  SetPlaying = 'setPlaying',
  TogglePlaying = 'togglePlaying',
}

export type MapAction =
  | { type: MapActionType.SetData; value: Series }
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
      return {
        ...state,
        data: action.value,
      };
    case MapActionType.SetActiveIndex:
      return {
        ...state,
        activeIndex: mod(action.value, state.data.summary.length),
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
      if (nextState.activeIndex === state.data.summary.length - 1) {
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
export type MapContextType = [MapState, React.Dispatch<MapAction>];

export const MapContext = React.createContext<MapContextType>(
  // This default value should never be used, it's just there to appease TS
  {} as MapContextType
);
