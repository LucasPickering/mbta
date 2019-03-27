import React from 'react';

import { Interval } from '../types';

const BG_COLOR = '#444444';
const FG_COLOR = '#cccccc';
const SELECTED_COLOR = '#f4e242';
const MAX_BAR_HEIGHT = 0.8; // Guarantee some padding above all bars

function makePercent(val: number): string {
  return `${val * 100}%`;
}

interface Props {
  intervals: Interval[];
  selectedStartTime: number;
}

const PlaybackSlider: React.ComponentType<Props> = ({
  intervals,
  selectedStartTime,
}) => {
  const numIntervals = intervals.length;
  const maxEntries = Math.max(...intervals.map(e => e.entries));
  const widthStr = makePercent(1 / numIntervals);

  return (
    <svg width="40%" height={60}>
      <rect width="100%" height="100%" fill={BG_COLOR} />
      {intervals.map(({ start_time, entries }, i) => {
        const height = (entries / maxEntries) * MAX_BAR_HEIGHT;

        return (
          <rect
            x={makePercent(i / numIntervals)}
            y={makePercent(1 - height)}
            width={widthStr}
            height={makePercent(height)}
            fill={start_time === selectedStartTime ? SELECTED_COLOR : FG_COLOR}
          />
        );
      })}
    </svg>
  );
};

export default PlaybackSlider;
