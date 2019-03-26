import { LatLng, LatLngBounds } from 'leaflet';
import React from 'react';
import { Map as LeafletMap, TileLayer } from 'react-leaflet';

const RADIUS_LAT = 0.1;
const RADIUS_LNG = 0.2;

const DEFAULT_CENTER = new LatLng(42.3558318, -71.0625356);
const BOUNDS = new LatLngBounds(
  [DEFAULT_CENTER.lat - RADIUS_LAT, DEFAULT_CENTER.lng - RADIUS_LNG],
  [DEFAULT_CENTER.lat + RADIUS_LAT, DEFAULT_CENTER.lng + RADIUS_LNG]
);

interface Props {}

const Map: React.FunctionComponent<Props> = () => {
  return (
    <LeafletMap
      className="full-size"
      center={DEFAULT_CENTER}
      maxBounds={BOUNDS}
      zoom={12}
      minZoom={12}
      maxZoom={15}
    >
      <TileLayer
        url="http://tiles.mapc.org/basemap/{z}/{x}/{y}.png"
        bounds={BOUNDS}
      />
    </LeafletMap>
  );
};

export default Map;
