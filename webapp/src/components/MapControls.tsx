import TextField from '@material-ui/core/TextField';
import Toolbar from '@material-ui/core/Toolbar';
import React, { useEffect, useRef, useState } from 'react';

import { IntervalSet } from '../types';
import PlaybackSlider from './PlaybackSlider';
import PlayPauseButton from './PlayPauseButton';

interface Props {
  summaryIntervals: IntervalSet;
  activeIndex: number;
  setActiveIndex: React.Dispatch<React.SetStateAction<number>>;
}

const PLAY_INTERVAL = 250;

const MapControls: React.ComponentType<Props> = ({
  summaryIntervals,
  activeIndex,
  setActiveIndex,
}) => {
  const [playing, setPlaying] = useState<boolean>(false);

  // We need this so that the setInterval closure can always access the current
  // value of playing. Otherwise, it would capture the value when the interval
  // is first created, and always use that value.
  const playingRef = useRef(playing);
  playingRef.current = playing;

  // One-time setup to create an interval that increments the active index
  useEffect(() => {
    const interval = setInterval(() => {
      if (playingRef.current) {
        setActiveIndex(
          prevActiveIndex => (prevActiveIndex + 1) % summaryIntervals.length
        );
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
      <PlaybackSlider
        intervals={summaryIntervals}
        activeIndex={activeIndex}
        setActiveIndex={setActiveIndex}
        setPlaying={setPlaying}
      />
      <PlayPauseButton playing={playing} setPlaying={setPlaying} />
    </Toolbar>
  );
};

export default MapControls;
