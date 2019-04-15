import React, { useCallback, useEffect, useReducer } from 'react';
import { defaultApiState } from '../state/api';
import { dateRangeFetcher, dateRangeReducer } from '../state/dateRange';
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
  const [dateRangeState, dateRangeDispatch] = useReducer(
    dateRangeReducer,
    defaultApiState
  );
  const [intervalsState, intervalsDispatch] = useReducer(
    intervalsReducer,
    defaultApiState
  );

  // One-time requests for valid date range and station data
  useEffect(() => dateRangeFetcher(dateRangeDispatch, {}), []);
  useEffect(() => stationsFetcher(stationsDispatch, {}), []);

  const onView = useCallback(
    datesState => intervalsFetcher(intervalsDispatch, datesState),
    [intervalsDispatch]
  );

  return (
    <Map attributionControl={false} zoomControl={false}>
      {dateRangeState.data && (
        <DateControls
          validDateRange={dateRangeState.data}
          intervalsLoading={intervalsState.loading}
          onView={onView}
        />
      )}

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
