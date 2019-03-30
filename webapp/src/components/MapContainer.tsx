import { Theme } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/styles';
import classNames from 'classnames';
import React, { useReducer } from 'react';

import { defaultMapState, MapContext, mapReducer } from '../state/map';
import MapControls from './MapControls';
import MapVisualization from './MapVisualization';

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
        <MapControls />
        <MapVisualization />
      </MapContext.Provider>
    </div>
  );
};

export default MapContainer;
