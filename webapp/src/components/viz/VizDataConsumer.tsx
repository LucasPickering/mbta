import React, { useEffect, useReducer } from 'react';
import {
  defaultMapState,
  MapActionType,
  MapDispatchContext,
  mapReducer,
  MapStateContext,
} from '../../state/map';
import { Series, Station } from '../../types';
import PlaybackControls from '../controls/PlaybackControls';
import MapStations from './MapStations';

interface Props {
  stations: Station[];
  data?: Series;
}

const VizDataConsumer: React.ComponentType<Props> = ({ stations, data }) => {
  const [mapState, mapDispatch] = useReducer(mapReducer, {
    ...defaultMapState,
    stations,
  });

  // When data changes, update it in our state
  useEffect(() => mapDispatch({ type: MapActionType.SetData, value: data }), [
    data,
  ]);

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
