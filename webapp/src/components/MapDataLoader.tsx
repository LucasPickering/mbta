import { Theme } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/styles';
import classNames from 'classnames';
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
        <div className={classNames(localClasses.root, 'full-size')}>
          <Loading loading={stationsState.loading} />
          {stationsState.data && intervalsState.data && <MapContainer />}
        </div>
      </IntervalsContext.Provider>
    </StationsContext.Provider>
  );
};

export default MapDataLoader;
