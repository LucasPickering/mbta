import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import React, { useContext, useEffect, useRef } from 'react';
import Control from 'react-leaflet-control';
import {
  MapActionType,
  MapDispatchContext,
  MapStateContext,
} from '../../state/map';
import IntervalDisplay from './IntervalDisplay';
import PlaybackButtons from './PlaybackButtons';
import PlaybackSlider from './PlaybackSlider';
import SeriesCsvButton from './SeriesCsvButton';

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
  const { playing, data } = useContext(MapStateContext);
  const dispatch = useContext(MapDispatchContext);
  const localClasses = useLocalStyles();

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

  // If there is non-empty data, render the controls
  if (data && data.activeInterval) {
    const {
      activeInterval: { time: activeTime },
    } = data;
    return (
      <>
        <Control className={localClasses.topRightControl} position="topright">
          <IntervalDisplay activeTime={activeTime} />
          <PlaybackButtons />
          <SeriesCsvButton />
        </Control>
        <Control>
          <PlaybackSlider />
        </Control>
      </>
    );
  }
  return null;
};

export default PlaybackControls;
