import Typography from '@material-ui/core/Typography';
import React from 'react';
import { Circle, Marker } from 'react-leaflet';

import { Station } from '../types';
import { formatLines } from '../util';
import Popup from './leaflet/Popup';

const SIZE_FACTOR: number = 10;
const CIRCLE_OPACITY = 0.25;

interface Props {
  station: Station;
  entries?: number;
}

const MapStation: React.ComponentType<Props> = ({
  station: { name, lat, lon, lines },
  entries,
}) => {
  const position: [number, number] = [lat, lon];
  const circleRadius = (entries || 0) * SIZE_FACTOR;
  const circleOpacity = CIRCLE_OPACITY / lines.length;

  return (
    <>
      <Marker position={position}>
        <Popup position={position}>
          <Typography variant="h6">{name}</Typography>
          <Typography variant="subtitle2">{formatLines(lines)}</Typography>
          <Typography>{entries} entries</Typography>
        </Popup>
      </Marker>
      {lines.map(line => (
        <Circle
          key={line}
          center={position}
          radius={circleRadius}
          stroke={false}
          color={line}
          fillOpacity={circleOpacity}
        />
      ))}
    </>
  );
};

export default MapStation;
