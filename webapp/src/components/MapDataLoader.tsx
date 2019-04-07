import { Theme } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/styles';
import React, { useEffect, useReducer } from 'react';

import classNames from 'classnames';
import { defaultApiState } from '../state/api';
import {
  StationsContext,
  stationsFetcher,
  stationsReducer,
} from '../state/stations';
import Loading from './Loading';
import MapContainer from './MapContainer';

const useLocalStyles = makeStyles(({  }: Theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

interface Props {}

const MapDataLoader: React.ComponentType<Props> = () => {
  const localClasses = useLocalStyles();
  const [stationsState, stationsDispatch] = useReducer(
    stationsReducer,
    defaultApiState
  );

  // One-time request for station data
  useEffect(() => stationsFetcher(stationsDispatch, {}), []);

  return (
    <StationsContext.Provider value={[stationsState, stationsDispatch]}>
      <div className={classNames(localClasses.root, 'full-size')}>
        <Loading loading={stationsState.loading} />
        {stationsState.data && <MapContainer />}
      </div>
    </StationsContext.Provider>
  );
};

export default MapDataLoader;
