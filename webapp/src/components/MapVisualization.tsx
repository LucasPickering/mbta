import React, { useContext } from 'react';
import { Circle } from 'react-leaflet';

import stations from '../data/stations.json';
import { MapContext } from '../state/map';
import { StationSet } from '../types';
import Map from './Map';

const typedStations = (stations as unknown) as StationSet;

const SIZE_FACTOR: number = 10;

interface Props {}

const MapVisualization: React.ComponentType<Props> = ({}) => {
  const [{ data, activeIndex }] = useContext(MapContext);
  // This component should only be rendered when data is defined
  const { summary, stations: stationIntervals } = data!;

  // Convert the index to an actual time. We know the summary time slots are
  // sorted and contain all possible times.
  const activeTime = summary[activeIndex].start_time;

  return (
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
};

export default MapVisualization;
