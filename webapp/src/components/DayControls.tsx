import TextField from '@material-ui/core/TextField';
import Toolbar from '@material-ui/core/Toolbar';
import React, { useState } from 'react';

import intervals from '../data/intervals.json';
import PlaybackSlider from './PlaybackSlider';

interface Props {}

const DayControls: React.ComponentType<Props> = () => {
  const [selectedStartTime, setSelectedStartTime] = useState<number>(
    intervals[0].start_time
  );

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
        selectedStartTime={selectedStartTime}
        onSelect={setSelectedStartTime}
      />
    </Toolbar>
  );
};

export default DayControls;
