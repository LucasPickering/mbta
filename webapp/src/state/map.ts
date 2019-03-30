import React from 'react';

import data from '../data/composite.json';
import { Series } from '../types';

export interface MapState {
  data?: Series;
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
  IncrActiveIndex = 'incrActiveIndex',
  SetPlaying = 'setPlaying',
  TogglePlaying = 'togglePlaying',
}

export type MapAction =
  | { type: MapActionType.SetData; value: Series }
  | { type: MapActionType.SetActiveIndex; value: number }
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
        activeIndex: action.value,
      };
    case MapActionType.IncrActiveIndex:
      const nextIndex = state.activeIndex + 1;
      const dataLength = state.data!.summary.length;

      if (nextIndex === dataLength - 1) {
        // If this is the last interval, stop playing
        return {
          ...state,
          playing: false,
          activeIndex: nextIndex,
        };
      } else if (nextIndex >= dataLength) {
        // If we've overflowed, go back to the beginning
        return {
          ...state,
          activeIndex: 0,
        };
      } else {
        return {
          ...state,
          activeIndex: nextIndex,
        };
      }
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
