import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import classNames from 'classnames';
import React from 'react';

import { maxBy } from 'lodash-es';
import { IntervalSet } from '../types';

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
  intervals: IntervalSet;
  activeIndex: number;
  setActiveIndex: React.Dispatch<React.SetStateAction<number>>;
  setPlaying: React.Dispatch<React.SetStateAction<boolean>>;
}

const PlaybackSlider: React.ComponentType<Props> = ({
  intervals,
  activeIndex,
  setActiveIndex,
  setPlaying,
}) => {
  const localClasses = useLocalStyles();
  const maxEntries: number = maxBy(intervals, int => int.entries)!.entries;

  return (
    <svg
      className={localClasses.root}
      viewBox={`0 0 ${intervals.length} ${1 + POINTER_HEIGHT}`}
      preserveAspectRatio="none"
    >
      {intervals.map(({ start_time, entries }, i) => {
        const height = entries / maxEntries;
        const isActive = i === activeIndex;

        return (
          <g key={start_time}>
            <rect
              className={classNames({
                [localClasses.unselected]: !isActive,
                [localClasses.selected]: isActive,
              })}
              x={i}
              y={1 - height}
              width={1}
              height={height}
              onClick={() => {
                setActiveIndex(i);
                setPlaying(false);
              }}
            />
            {isActive && (
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
