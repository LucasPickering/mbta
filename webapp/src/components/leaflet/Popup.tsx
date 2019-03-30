import React from 'react';
import { Popup } from 'react-leaflet';

const Map: React.ComponentType<React.ComponentProps<typeof Popup>> = props => {
  return <Popup {...props} />;
};

export default Map;
