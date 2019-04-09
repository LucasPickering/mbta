import React, { useContext } from 'react';
import { MapStateContext } from '../../state/map';
import MapStation from './MapStation';

interface Props {}

const MapStations: React.ComponentType<Props> = ({}) => {
  const {
    stations,
    intervals: { summary, stations: stationIntervals },
    activeIndex,
  } = useContext(MapStateContext);

  // Convert the index to an actual time. We know the summary time slots are
  // sorted and contain all possible times.
  const activeTime = summary[activeIndex].start_time;

  return (
    <>
      {stations.map(station => {
        const stationInterval = stationIntervals[station.gtfs_id];
        return (
          <MapStation
            key={station.gtfs_id}
            station={station}
            entries={stationInterval && stationInterval[activeTime]}
          />
        );
      })}
    </>
  );
};

export default MapStations;
