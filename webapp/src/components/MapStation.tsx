import Typography from '@material-ui/core/Typography';
import React from 'react';
import { Circle, Marker } from 'react-leaflet';

import { formatLines, formatTime } from '../funcs';
import { Station } from '../types';
import Popup from './leaflet/Popup';

const SIZE_FACTOR: number = 10;
const CIRCLE_OPACITY = 0.25;

interface Props {
  station: Station;
  activeTime: number;
  entries?: number;
}

const MapStation: React.ComponentType<Props> = ({
  station: { name, lat, lon, lines },
  activeTime,
  entries,
}) => {
  const position: [number, number] = [lat, lon];
  const circleRadius = entries! * SIZE_FACTOR;
  const circleOpacity = CIRCLE_OPACITY / lines.length;

  return (
    <>
      <Marker position={position}>
        <Popup position={position}>
          <h3>{name}</h3>
          <Typography>Time: {formatTime(activeTime)}</Typography>
          <Typography>Lines: {formatLines(lines)}</Typography>
          <Typography>Entries: {entries}</Typography>
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
