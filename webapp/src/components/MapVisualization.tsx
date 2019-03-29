import React from 'react';
import { Circle } from 'react-leaflet';

import stations from '../data/stations.json';
import { StationIntervals, StationSet } from '../types.js';
import Map from './Map';

const typedStations = (stations as unknown) as StationSet;

const SIZE_FACTOR: number = 10;

interface Props {
  activeTime: number;
  stationIntervals: StationIntervals;
}

const MapVisualization: React.ComponentType<Props> = ({
  activeTime,
  stationIntervals,
}) => (
  <Map>
    {Object.entries(stationIntervals).map(([stationId, stationData]) => {
      const { lat, lon } = typedStations[stationId];
      return (
        <Circle
          key={stationId}
          center={[lat, lon]}
          radius={stationData[activeTime] * SIZE_FACTOR}
          stroke={false}
        />
      );
    })}
  </Map>
);

export default MapVisualization;
