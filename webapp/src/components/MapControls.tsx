import TextField from '@material-ui/core/TextField';
import Toolbar from '@material-ui/core/Toolbar';
import React, { useContext, useEffect, useRef } from 'react';

import { MapActionType, MapContext } from '../state/map';
import PlaybackSlider from './PlaybackSlider';
import PlayPauseButton from './PlayPauseButton';

interface Props {}

const PLAY_INTERVAL = 250;

const MapControls: React.ComponentType<Props> = ({}) => {
  const [{ playing }, dispatch] = useContext(MapContext);

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
    <Toolbar>
      <form noValidate>
        <TextField
          id="date"
          label="Date"
          type="date"
          defaultValue="2018-12-31"
        />
      </form>
      <PlaybackSlider />
      <PlayPauseButton />
    </Toolbar>
  );
};

export default MapControls;
