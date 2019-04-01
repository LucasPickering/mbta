import React, { useContext } from 'react';

import stations from '../data/stations.json';
import { MapContext } from '../state/map';
import { StationSet } from '../types';
import Map from './leaflet/Map';
import MapStation from './MapStation';

const typedStations = (stations as unknown) as StationSet;

interface Props {}

const MapVisualization: React.ComponentType<Props> = ({}) => {
  const [
    {
      data: { summary, stations: stationIntervals },
      activeIndex,
    },
  ] = useContext(MapContext);

  // Convert the index to an actual time. We know the summary time slots are
  // sorted and contain all possible times.
  const activeTime = summary[activeIndex].start_time;

  return (
    <Map>
      {Object.values(typedStations).map(station => (
        <MapStation
          key={station.gtfs_id}
          station={station}
          entries={stationIntervals[station.gtfs_id][activeTime]}
        />
      ))}
    </Map>
  );
};

export default MapVisualization;
