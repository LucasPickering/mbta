import { pad } from 'lodash-es';
import React from 'react';
import { Circle } from 'react-leaflet';

import { Station } from '../types';
import Popup from './leaflet/Popup';

const SIZE_FACTOR: number = 10;

function formatTime(time: number): string {
  const minutes = time % 100;
  const hours = Math.floor(time / 100);
  return `${hours}:${pad(minutes.toString(), 2, '0')}`;
}

interface Props {
  station: Station;
  activeTime: number;
  entries?: number;
}

const MapVisualization: React.ComponentType<Props> = ({
  station: { name, lat, lon },
  activeTime,
  entries,
}) => {
  const position: [number, number] = [lat, lon];

  return (
    <Circle center={position} radius={entries! * SIZE_FACTOR} stroke={false}>
      <Popup position={position}>
        <h3>{name}</h3>
        Time: {formatTime(activeTime)}
        <br />
        Entries: {entries}
      </Popup>
    </Circle>
  );
};

export default MapVisualization;
