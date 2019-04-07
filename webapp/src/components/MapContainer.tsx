import React, { useReducer } from 'react';
import { defaultMapState, MapContext, mapReducer } from '../state/map';
import DateControls from './controls/DateControls';
import PlaybackControls from './controls/PlaybackControls';
import Map from './leaflet/Map';
import MapStations from './viz/MapStations';

interface Props {}

const MapContainer: React.ComponentType<Props> = () => (
  <MapContext.Provider value={useReducer(mapReducer, defaultMapState)}>
    <Map attributionControl={false} zoomControl={false}>
      <DateControls />
      <PlaybackControls />
      <MapStations />
    </Map>
  </MapContext.Provider>
);

export default MapContainer;
