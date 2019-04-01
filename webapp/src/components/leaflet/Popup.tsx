import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import React from 'react';
import { Popup } from 'react-leaflet';

const useLocalStyles = makeStyles(({ spacing }: Theme) => ({
  root: {},
}));

const Map: React.ComponentType<React.ComponentProps<typeof Popup>> = props => {
  const localClasses = useLocalStyles();
  return <Popup className={localClasses.root} {...props} />;
};

export default Map;
