import React, { useEffect, useReducer } from 'react';

import { defaultApiState } from '../state/api';
import {
  StationsContext,
  stationsFetcher,
  stationsReducer,
} from '../state/stations';
import Loading from './Loading';
import MapContainer from './MapContainer';

interface Props {}

const MapDataLoader: React.ComponentType<Props> = () => {
  const [stationsState, stationsDispatch] = useReducer(
    stationsReducer,
    defaultApiState
  );

  // One-time request for station data
  useEffect(() => stationsFetcher(stationsDispatch, {}), []);

  return (
    <StationsContext.Provider value={[stationsState, stationsDispatch]}>
      <div className="full-size">
        <Loading loading={stationsState.loading} />
        {stationsState.data && <MapContainer />}
      </div>
    </StationsContext.Provider>
  );
};

export default MapDataLoader;
