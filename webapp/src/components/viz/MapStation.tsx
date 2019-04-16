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
    const position: [number, number] = [lat, lon];

    return (
      <>
        <Marker position={position} icon={LINE_ICONS[lines[0]]}>
          <Popup position={position}>
            <Typography variant="h6">{name}</Typography>
            <Typography variant="subtitle2">{formatLines(lines)}</Typography>
            {/* If we have entry data, show it in the popup */}
            {entries !== undefined && (
              <Typography variant="subtitle1">
                {entries.toFixed(1)} entries
              </Typography>
            )}
          </Popup>
        </Marker>

        {entries && (
          <Circle
            center={position}
            // sqrt the entries so that we scale the area instead of the radius
            radius={Math.sqrt(entries) * SIZE_FACTOR}
            stroke={false}
            color="black"
          />
        )}
      </>
    );
  }
);

export default MapStation;
