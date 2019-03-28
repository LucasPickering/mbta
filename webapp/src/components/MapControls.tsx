import TextField from '@material-ui/core/TextField';
import Toolbar from '@material-ui/core/Toolbar';
import { sortedIndex } from 'lodash-es';
import React, { useEffect, useMemo, useState } from 'react';

import { IntervalSet } from '../types';
import PlaybackSlider from './PlaybackSlider';

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
  const [playing, setPlaying] = useState<boolean>(true);

  useEffect(() => {
    const interval = setInterval(
      () =>
        setActiveIndex(
          prevActiveIndex => (prevActiveIndex + 1) % summaryIntervals.length
        ),
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
        intervals={summaryIntervals}
        activeIndex={activeIndex}
        // onSelect={setSelectedTime}
      />
    </Toolbar>
  );
};

export default MapControls;
