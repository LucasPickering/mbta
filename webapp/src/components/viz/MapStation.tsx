import Typography from '@material-ui/core/Typography';
import L from 'leaflet';
import { mapValues } from 'lodash-es';
import React from 'react';
import { Circle, Marker } from 'react-leaflet';
import { Station } from '../../types';
import { formatLines } from '../../util';
import Popup from '../leaflet/Popup';

const SIZE_FACTOR: number = 25;

const LINE_ICONS = mapValues(
  {
    blue: 'blue',
    green: 'green',
    orange: 'orange',
    red: 'red',
    silver: 'grey',
  },
  color =>
    L.icon({
      iconUrl: `https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-${color}.png`,
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

const MapStation: React.ComponentType<Props> = React.memo(
  ({ station: { name, lat, lon, lines }, entries }) => {
    const entriesNotNull = entries || 0;
    const position: [number, number] = [lat, lon];
    // sqrt the entries so that we scale the area instead of the radius
    const circleRadius = Math.sqrt(entriesNotNull) * SIZE_FACTOR;

    return (
      <>
        <Marker position={position} icon={LINE_ICONS[lines[0]]}>
          <Popup position={position}>
            <Typography variant="h6">{name}</Typography>
            <Typography variant="subtitle2">{formatLines(lines)}</Typography>
            <Typography variant="subtitle1">
              {entriesNotNull.toFixed(1)} entries
            </Typography>
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
  }
);

export default MapStation;
