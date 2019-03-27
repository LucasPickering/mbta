import TextField from '@material-ui/core/TextField';
import Toolbar from '@material-ui/core/Toolbar';
import React, { useEffect, useState } from 'react';

import intervals from '../data/intervals.json';
import PlaybackSlider from './PlaybackSlider';

interface Props {}

const PLAY_INTERVAL = 250;

const DayControls: React.ComponentType<Props> = () => {
  const [playing, setPlaying] = useState<boolean>(true);
  const [activeIntIndex, setActiveIntIndex] = useState<number>(0);
  const activeInterval = intervals[activeIntIndex];

  useEffect(() => {
    const interval = setInterval(
      () => setActiveIntIndex(prevVal => (prevVal + 1) % intervals.length),
      PLAY_INTERVAL
    );
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
        intervals={intervals}
        activeTime={activeInterval.start_time}
        // onSelect={setSelectedTime}
      />
    </Toolbar>
  );
};

export default DayControls;
