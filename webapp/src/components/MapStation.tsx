import Typography from '@material-ui/core/Typography';
import Leaflet from 'leaflet';
import { mapValues } from 'lodash-es';
import React from 'react';
import { Circle, Marker } from 'react-leaflet';

import { Station } from '../types';
import { formatLines } from '../util';
import Popup from './leaflet/Popup';

const SIZE_FACTOR: number = 50;

const LINE_ICONS = mapValues(
  {
    blue:
      'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png',
    green:
      'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png',
    orange:
      'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-orange.png',
    red:
      'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
    silver:
      'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-grey.png',
  },
  url =>
    Leaflet.icon({
      iconUrl: url,
      shadowUrl:
        'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
      iconSize: [13, 21],
      iconAnchor: [6, 21],
      popupAnchor: [1, -20],
      shadowSize: [21, 21],
    })
);

interface Props {
  station: Station;
  entries?: number;
}

const MapStation: React.ComponentType<Props> = ({
  station: { name, lat, lon, lines },
  entries,
}) => {
  const position: [number, number] = [lat, lon];
  // sqrt the entries so that we scale the area instead of the radius
  const circleRadius = Math.sqrt(entries || 0) * SIZE_FACTOR;

  return (
    <>
      <Marker position={position} icon={LINE_ICONS[lines[0]]}>
        <Popup position={position}>
          <Typography variant="h6">{name}</Typography>
          <Typography variant="subtitle2">{formatLines(lines)}</Typography>
          <Typography variant="subtitle1">{entries} entries</Typography>
        </Popup>
      </Marker>

      <Circle
        center={position}
        radius={circleRadius}
        stroke={false}
        color="black"
      />
    </>
  );
};

export default MapStation;
