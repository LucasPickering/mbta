import { Theme } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/styles';
import classNames from 'classnames';
import React, { useReducer } from 'react';

import { defaultMapState, MapContext, mapReducer } from '../state/map';
import DateControls from './controls/DateControls';
import PlaybackControls from './controls/PlaybackControls';
import MapVisualization from './viz/MapVisualization';

const useLocalStyles = makeStyles(({  }: Theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
  },
}));

interface Props {}

const MapContainer: React.ComponentType<Props> = () => {
  const localClasses = useLocalStyles();

  return (
    <div className={classNames('full-size', localClasses.root)}>
      <MapContext.Provider value={useReducer(mapReducer, defaultMapState)}>
        <DateControls />
        <PlaybackControls />
        <MapVisualization />
      </MapContext.Provider>
    </div>
  );
};

export default MapContainer;
