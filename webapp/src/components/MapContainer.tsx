import React from 'react';

import DayControls from './DayControls';
import Map from './Map';

interface Props {}

const MapContainer: React.ComponentType<Props> = () => {
  return (
    <div className="full-size">
      <DayControls />
      <Map />
    </div>
  );
};

export default MapContainer;
