import React, { useReducer } from 'react';
import { defaultMapState, MapContext, mapReducer } from '../../state/map';
import { Series, Station } from '../../types';
import PlaybackControls from '../controls/PlaybackControls';
import MapStations from './MapStations';

interface Props {
  stations: Station[];
  intervals: Series;
}

const MapDataConsumer: React.ComponentType<Props> = ({
  stations,
  intervals,
}) => (
  <MapContext.Provider
    value={useReducer(mapReducer, {
      ...defaultMapState,
      stations,
      intervals,
    })}
  >
    <PlaybackControls />
    <MapStations />
  </MapContext.Provider>
);

export default MapDataConsumer;
