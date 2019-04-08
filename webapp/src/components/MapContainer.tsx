import { Theme } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/styles';
import React, { useEffect, useReducer } from 'react';
import { defaultApiState } from '../state/api';
import {
  IntervalsContext,
  intervalsFetcher,
  intervalsReducer,
} from '../state/intervals';
import {
  StationsContext,
  stationsFetcher,
  stationsReducer,
} from '../state/stations';
import DateControls from './controls/DateControls';
import Map from './leaflet/Map';
import Loading from './Loading';
import MapDataConsumer from './viz/MapDataConsumer';

interface Props {}

const MapContainer: React.ComponentType<Props> = ({}) => {
  const [stationsState, stationsDispatch] = useReducer(
    stationsReducer,
    defaultApiState
  );
  const [intervalsState, intervalsDispatch] = useReducer(
    intervalsReducer,
    defaultApiState
  );

  // One-time request for station data
  useEffect(() => stationsFetcher(stationsDispatch, {}), []);
  useEffect(() => intervalsFetcher(intervalsDispatch, {}), []); // TODO

  return (
    <StationsContext.Provider value={[stationsState, stationsDispatch]}>
      <IntervalsContext.Provider value={[intervalsState, intervalsDispatch]}>
        <Map attributionControl={false} zoomControl={false}>
          <DateControls />

          <Loading loading={stationsState.loading || intervalsState.loading} />
          {stationsState.data && intervalsState.data && (
            <MapDataConsumer
              stations={stationsState.data}
              intervals={intervalsState.data}
            />
          )}
        </Map>
      </IntervalsContext.Provider>
    </StationsContext.Provider>
  );
};

export default MapContainer;
