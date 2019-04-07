import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { maxBy } from 'lodash-es';
import React, { useContext } from 'react';

import { MapActionType, MapContext } from '../../state/map';

const useLocalStyles = makeStyles(({  }: Theme) => ({
  root: {
    width: 1000,
    height: 60,
    position: 'fixed',
    bottom: 0,
    left: 0,
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

interface Props {}

const PlaybackSlider: React.ComponentType<Props> = ({}) => {
  const [
    {
      data: { summary: summaryIntervals },
      activeIndex,
    },
    dispatch,
  ] = useContext(MapContext);
  const localClasses = useLocalStyles();

  // Get the highest interval, to figure out how to scale each bar
  const maxEntries: number = maxBy(summaryIntervals, int => int.entries)!
    .entries;

  return (
    <svg
      className={localClasses.root}
      viewBox={`0 0 ${summaryIntervals.length} 1`}
      preserveAspectRatio="none"
    >
      {summaryIntervals.map(({ start_time, entries }, i) => {
        const height = entries / maxEntries;
        const isActive = i === activeIndex;

        return (
          <g key={start_time}>
            <rect
              className={
                isActive ? localClasses.selected : localClasses.unselected
              }
              x={i}
              y={1 - height}
              width={1}
              height={height}
              onClick={() => {
                dispatch({ type: MapActionType.SetActiveIndex, value: i });
                dispatch({ type: MapActionType.SetPlaying, value: false });
              }}
            />
          </g>
        );
      })}
    </svg>
  );
};

export default PlaybackSlider;
