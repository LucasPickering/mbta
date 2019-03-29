import React, { useState } from 'react';

import data from '../data/composite.json';
import { SeriesSet } from '../types.js';
import MapControls from './MapControls';
import MapVisualization from './MapVisualization';

const typedData = (data as unknown) as SeriesSet;

interface Props {}

const MapContainer: React.ComponentType<Props> = () => {
  const {
    series1: { summary, stations },
  } = typedData;

  const [activeIndex, setActiveIndex] = useState<number>(0);
  // Convert the index to an actual time. We know the summary time slots are
  // sorted and contain all possible times.
  const activeTime = summary[activeIndex].start_time;

  return (
    <div className="full-size">
      <MapControls
        summaryIntervals={summary}
        activeIndex={activeIndex}
        setActiveIndex={setActiveIndex}
      />
      <MapVisualization activeTime={activeTime} stationIntervals={stations} />
    </div>
  );
};

export default MapContainer;
