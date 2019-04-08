import CircularProgress from '@material-ui/core/CircularProgress';
import React, { useEffect, useReducer } from 'react';
import { defaultApiState } from '../state/api';
import { intervalsFetcher, intervalsReducer } from '../state/intervals';
import { stationsFetcher, stationsReducer } from '../state/stations';
import DateControls from './controls/DateControls';
import Map from './leaflet/Map';
import VizDataConsumer from './viz/VizDataConsumer';

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

  return (
    <Map attributionControl={false} zoomControl={false}>
      <DateControls
        intervalsLoading={intervalsState.loading}
        onView={datesState => intervalsFetcher(intervalsDispatch, datesState)}
      />

      {stationsState.data && intervalsState.data && (
        <VizDataConsumer
          stations={stationsState.data}
          intervals={intervalsState.data}
        />
      )}
    </Map>
  );
};

export default MapContainer;
