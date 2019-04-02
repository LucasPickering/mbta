import React, { useContext } from 'react';

import { MapContext } from '../state/map';
import { StationsContext } from '../state/stations';
import { StationSet } from '../types';
import Map from './leaflet/Map';
import MapStation from './MapStation';

interface Props {}

const MapVisualization: React.ComponentType<Props> = ({}) => {
  const [{ data: stations }] = useContext(StationsContext);
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
      {stations!.map(station => (
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
