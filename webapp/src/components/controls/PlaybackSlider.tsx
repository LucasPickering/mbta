import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import classNames from 'classnames';
import { maxBy } from 'lodash-es';
import React, { useContext } from 'react';
import {
  MapActionType,
  MapDispatchContext,
  MapStateContext,
} from '../../state/map';

// This height gets added to every bar, so the smallest bars are still visible
const MIN_BAR_HEIGHT = 0.1;
const SVG_VIEWPORT_HEIGHT = 1 + MIN_BAR_HEIGHT;

const useLocalStyles = makeStyles(({ palette }: Theme) => ({
  root: {
    width: '100%',
    height: '10%',
    position: 'fixed',
    bottom: 0,
    left: 0,
  },
  bar: {
    cursor: 'pointer',
    fill: palette.primary.main,
    '&:hover': {
      fill: palette.primary.light,
    },
  },
  unselected: {
    fillOpacity: 0.6,
  },
}));

interface Props {}

const PlaybackSlider: React.ComponentType<Props> = ({}) => {
  const {
    intervals: { summary: summaryIntervals },
    activeIndex,
  } = useContext(MapStateContext);
  const dispatch = useContext(MapDispatchContext);
  const localClasses = useLocalStyles();

  // Get the highest interval, to figure out how to scale each bar
  const maxEntries: number = maxBy(summaryIntervals, int => int.avg_entries)!
    .avg_entries;

  return (
    <svg
      className={localClasses.root}
      viewBox={`0 0 ${summaryIntervals.length} ${SVG_VIEWPORT_HEIGHT}`}
      preserveAspectRatio="none"
      // Vertical invert. Makes the positioning of the bars simpler
      transform={`translate(0,${SVG_VIEWPORT_HEIGHT}) scale(1,-1)`}
    >
      {summaryIntervals.map(({ start_time, avg_entries }, i) => {
        const height = avg_entries / maxEntries + MIN_BAR_HEIGHT;
        const isActive = i === activeIndex;

        return (
          <g key={start_time}>
            <rect
              className={classNames(
                localClasses.bar,
                !isActive && localClasses.unselected
              )}
              x={i}
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
