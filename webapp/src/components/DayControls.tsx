import TextField from '@material-ui/core/TextField';
import Toolbar from '@material-ui/core/Toolbar';
import React from 'react';

import intervals from '../data/intervals.json';
import PlaybackSlider from './PlaybackSlider';

interface Props {}

const DayControls: React.ComponentType<Props> = () => {
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
      <PlaybackSlider intervals={intervals} selectedStartTime={2215} />
    </Toolbar>
  );
};

export default DayControls;
