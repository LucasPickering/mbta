import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import classNames from 'classnames';
import React from 'react';

import { Interval } from '../types';

const POINTER_WIDTH = 1.5;
const POINTER_HEIGHT = 0.2;
const POINTER_POINTS = [
  [0, 0],
  [POINTER_WIDTH / 2, POINTER_HEIGHT],
  [-POINTER_WIDTH / 2, POINTER_HEIGHT],
]
  .map(p => p.join(','))
  .join(' ');

const useLocalStyles = makeStyles(({ spacing }: Theme) => ({
  root: {
    padding: spacing.unit,
    width: '40%',
    height: 60,
  },
  unselected: {
    fill: '#aaaaaa',
    '&:hover': {
      fill: '#888888',
    },
  },
  selected: {
    fill: '#f4e242',
  },
}));

interface Props {
  intervals: Interval[];
  selectedStartTime: number;
  onSelect?: (selectedStartTime: number) => void;
}

const PlaybackSlider: React.ComponentType<Props> = ({
  intervals,
  selectedStartTime,
  onSelect,
}) => {
  const localClasses = useLocalStyles();
  const maxEntries = Math.max(...intervals.map(e => e.entries));

  return (
    <svg
      className={localClasses.root}
      viewBox={`0 0 ${intervals.length} ${1 + POINTER_HEIGHT}`}
      preserveAspectRatio="none"
    >
      {intervals.map(({ start_time, entries }, i) => {
        const height = entries / maxEntries;
        const isSelected = start_time === selectedStartTime;

        return (
          <g key={start_time}>
            <rect
              className={classNames({
                [localClasses.unselected]: !isSelected,
                [localClasses.selected]: isSelected,
              })}
              x={i}
              y={1 - height}
              width={1}
              height={height}
              onClick={onSelect && (() => onSelect(start_time))}
            />
            {isSelected && (
              <polygon
                className={localClasses.selected}
                points={POINTER_POINTS}
                transform={`translate(${i + 0.5} 1)`}
              />
            )}
          </g>
        );
      })}
    </svg>
  );
};

export default PlaybackSlider;
