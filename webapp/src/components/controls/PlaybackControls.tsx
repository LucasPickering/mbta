import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import React, { useContext, useEffect, useRef } from 'react';
import Control from 'react-leaflet-control';
import { MapActionType, MapContext } from '../../state/map';
import IntervalDisplay from './IntervalDisplay';
import PlaybackButtons from './PlaybackButtons';
import PlaybackSlider from './PlaybackSlider';

const useLocalStyles = makeStyles(({  }: Theme) => ({
  topRightControl: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'end',
  },
}));

interface Props {}

const PLAY_INTERVAL = 250;

const PlaybackControls: React.ComponentType<Props> = ({}) => {
  const [
    {
      playing,
      activeIndex,
      intervals: { summary },
    },
    dispatch,
  ] = useContext(MapContext);
  const localClasses = useLocalStyles();

  const activeTime = summary[activeIndex].start_time;

  // We need this so that the setInterval closure can always access the current
  // value of playing. Otherwise, it would capture the value when the interval
  // is first created, and always use that value.
  const playingRef = useRef(playing);
  playingRef.current = playing;

  // One-time setup to create an interval that increments the active index
  useEffect(() => {
    const interval = setInterval(() => {
      if (playingRef.current) {
        dispatch({ type: MapActionType.IncrActiveIndex });
      }
    }, PLAY_INTERVAL);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Control className={localClasses.topRightControl} position="topright">
        <IntervalDisplay activeTime={activeTime} />
        <PlaybackButtons />
      </Control>
      <Control>
        <PlaybackSlider />
      </Control>
    </>
  );
};

export default PlaybackControls;
