import React from 'react';
import { Circle } from 'react-leaflet';

import stations from '../data/stations.json';
import { Station, StationIntervals } from '../types.js';
import Map from './Map';

const typedStations = (stations as unknown) as Station[];

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
    {typedStations.map(({ gtfs_id, lat, lon }) => {
      const stationData = stationIntervals[gtfs_id];
      if (stationData) {
        return (
          <Circle
            key={gtfs_id}
            center={[lat, lon]}
            radius={stationData[activeTime] * SIZE_FACTOR}
            stroke={false}
          />
        );
      }
    })}
  </Map>
);

export default MapVisualization;
