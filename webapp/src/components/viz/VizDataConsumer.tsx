import React, { useReducer } from 'react';
import {
  defaultMapState,
  MapDispatchContext,
  mapReducer,
  MapStateContext,
} from '../../state/map';
import { Series, Station } from '../../types';
import PlaybackControls from '../controls/PlaybackControls';
import MapStations from './MapStations';

interface Props {
  stations: Station[];
  intervals: Series;
}

const VizDataConsumer: React.ComponentType<Props> = ({
  stations,
  intervals,
}) => {
  const [mapState, mapDispatch] = useReducer(mapReducer, {
    ...defaultMapState,
    stations,
    intervals,
  });

  return (
    <MapStateContext.Provider value={mapState}>
      <MapDispatchContext.Provider value={mapDispatch}>
        <PlaybackControls />
        <MapStations />
      </MapDispatchContext.Provider>
    </MapStateContext.Provider>
  );
};

export default VizDataConsumer;
