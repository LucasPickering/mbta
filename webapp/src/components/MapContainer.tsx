import React, { useState } from 'react';
import { Circle } from 'react-leaflet';

import data from '../data/array.json';
import { SeriesSet } from '../types.js';
import Map from './Map';
import MapControls from './MapControls';

const typedData = (data as unknown) as SeriesSet;

const stations = [{ lat: 42.35, lng: -71.06 }];

interface Props {}

const MapContainer: React.ComponentType<Props> = () => {
  const {
    series1: { summary },
  } = typedData;

  const [activeIndex, setActiveIndex] = useState<number>(0);

  return (
    <div className="full-size">
      <MapControls
        summaryIntervals={summary}
        activeIndex={activeIndex}
        setActiveIndex={setActiveIndex}
      />
      <Map>
        {stations.map(({ lat, lng }) => (
          <Circle key={lat} center={[lat, lng]} radius={1000} stroke={false} />
        ))}
      </Map>
    </div>
  );
};

export default MapContainer;
