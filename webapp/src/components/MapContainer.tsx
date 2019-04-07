import React, { useContext, useReducer } from 'react';
import { IntervalsContext } from '../state/intervals';
import { defaultMapState, MapContext, mapReducer } from '../state/map';
import DateControls from './controls/DateControls';
import PlaybackControls from './controls/PlaybackControls';
import Map from './leaflet/Map';
import MapStations from './viz/MapStations';

interface Props {}

const MapContainer: React.ComponentType<Props> = ({}) => {
  const [{ data }] = useContext(IntervalsContext);

  if (data!.summary.length === 0) {
    return <p>No data!</p>;
  }

  return (
    <MapContext.Provider
      value={useReducer(mapReducer, { ...defaultMapState, data: data! })}
    >
      <Map attributionControl={false} zoomControl={false}>
        <DateControls />
        <PlaybackControls />
        <MapStations />
      </Map>
    </MapContext.Provider>
  );
};

export default MapContainer;
