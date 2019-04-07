import React, { useContext, useEffect, useRef } from 'react';
import Control from 'react-leaflet-control';

import { MapActionType, MapContext } from '../../state/map';
import IntervalDisplay from './IntervalDisplay';
import NextButton from './NextButton';
import PlaybackSlider from './PlaybackSlider';
import PlayPauseButton from './PlayPauseButton';
import PrevButton from './PrevButton';

interface Props {}

const PLAY_INTERVAL = 250;

const PlaybackControls: React.ComponentType<Props> = ({}) => {
  const [
    {
      playing,
      activeIndex,
      data: { summary },
    },
    dispatch,
  ] = useContext(MapContext);

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
      <Control position="topright">
        <IntervalDisplay activeTime={activeTime} />
      </Control>
      <Control position="bottomleft">
        <PrevButton />
        <PlayPauseButton />
        <NextButton />
      </Control>
      <Control>
        <PlaybackSlider />
      </Control>
    </>
  );
};

export default PlaybackControls;
