import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import classNames from 'classnames';
import React, { useContext } from 'react';
import {
  MapActionType,
  MapDispatchContext,
  MapStateContext,
} from '../../state/map';

const MAX_ENTRIES = 2200; // Global max for entries in an interval
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
  const { data } = useContext(MapStateContext);
  const dispatch = useContext(MapDispatchContext);
  const localClasses = useLocalStyles();

  // This component should only be rendered when data is non-null and non-empty
  const {
    intervals: { summary },
    times,
    activeInterval,
  } = data!;
  const { time: activeTime } = activeInterval!;

  return (
    <svg
      className={localClasses.root}
      viewBox={`0 0 ${times.length} ${SVG_VIEWPORT_HEIGHT}`}
      preserveAspectRatio="none"
      // Vertical invert. Makes the positioning of the bars simpler
      transform={`translate(0,${SVG_VIEWPORT_HEIGHT}) scale(1,-1)`}
    >
      {times.map((time, i) => {
        // TODO: Will need to do a null check once we have multiple series
        const entries = summary[time];
        const height = entries / MAX_ENTRIES + MIN_BAR_HEIGHT;
        const isActive = time === activeTime;

        return (
          <rect
            key={time}
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
        );
      })}
    </svg>
  );
};

export default PlaybackSlider;
