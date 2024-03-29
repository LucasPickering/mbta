import { LatLng, LatLngBounds } from 'leaflet';
import React from 'react';
import { Map as LeafletMap, TileLayer } from 'react-leaflet';

const RADIUS_LAT = 0.2;
const RADIUS_LNG = 0.2;

const DEFAULT_CENTER = new LatLng(42.3558318, -71.0625356);
const BOUNDS = new LatLngBounds(
  [DEFAULT_CENTER.lat - RADIUS_LAT, DEFAULT_CENTER.lng - RADIUS_LNG],
  [DEFAULT_CENTER.lat + RADIUS_LAT, DEFAULT_CENTER.lng + RADIUS_LNG]
);

const Map: React.ComponentType<React.ComponentProps<typeof LeafletMap>> = ({
  children,
  ...rest
}) => {
  return (
    <LeafletMap
      className="full-size"
      center={DEFAULT_CENTER}
      maxBounds={BOUNDS}
      zoom={12}
      minZoom={12}
      maxZoom={16}
      maxBoundsViscosity={0.5}
      {...rest}
    >
      <TileLayer url="http://tiles.mapc.org/basemap/{z}/{x}/{y}.png" />
      {children}
    </LeafletMap>
  );
};

export default Map;
