import React, { useContext } from 'react';
import { MapStateContext } from '../../state/map';
import MapStation from './MapStation';

interface Props {}

const MapStations: React.ComponentType<Props> = ({}) => {
  const { stations, data } = useContext(MapStateContext);

  if (data && data.activeInterval) {
    const {
      intervals: { stations: stationIntervals },
      activeInterval,
    } = data;
    return (
      <>
        {stations.map(station => {
          const stationInterval = stationIntervals[station.gtfs_id];
          return (
            <MapStation
              key={station.gtfs_id}
              station={station}
              // If there is data for this station, and at the active time,
              // pass that. Otherwise just pass 0.
              entries={
                (stationInterval && stationInterval[activeInterval.time]) || 0
              }
            />
          );
        })}
      </>
    );
  }

  // No data to show, just show the stations
  return (
    <>
      {stations.map(station => {
        return <MapStation key={station.gtfs_id} station={station} />;
      })}
    </>
  );
};

export default MapStations;
