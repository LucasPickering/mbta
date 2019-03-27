import React from 'react';
import { Circle } from 'react-leaflet';

import DayControls from './DayControls';
import Map from './Map';

const stations = [{ lat: 42.35, lng: -71.06 }];

interface Props {}

const MapContainer: React.ComponentType<Props> = () => {
  return (
    <div className="full-size">
      <DayControls />
      <Map>
        {stations.map(({ lat, lng }) => (
          <Circle key={lat} center={[lat, lng]} radius={1000} stroke={false} />
        ))}
      </Map>
    </div>
  );
};

export default MapContainer;
