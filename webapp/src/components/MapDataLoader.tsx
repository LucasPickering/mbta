import axios from 'axios';
import React, { useEffect, useReducer } from 'react';

import { ApiActionType, defaultApiState } from '../state/api';
import { StationsContext, stationsReducer } from '../state/stations';
import MapContainer from './MapContainer';

interface Props {}

const MapDataLoader: React.ComponentType<Props> = () => {
  const [stationsState, stationsDispatch] = useReducer(
    stationsReducer,
    defaultApiState
  );

  // One-time request for station data
  useEffect(() => {
    stationsDispatch({ type: ApiActionType.Request });
    axios
      .get('/api/stations')
      .then(response => {
        stationsDispatch({ type: ApiActionType.Success, data: response.data });
      })
      .catch(err => {
        stationsDispatch({ type: ApiActionType.Error, error: err });
      });
  }, []);

  return (
    <StationsContext.Provider value={[stationsState, stationsDispatch]}>
      {stationsState.loading && 'Loading...'}
      {stationsState.data && <MapContainer />}
    </StationsContext.Provider>
  );
};

export default MapDataLoader;
