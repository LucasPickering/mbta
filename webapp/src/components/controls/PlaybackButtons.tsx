import React from 'react';

import NextButton from './NextButton';
import PlayPauseButton from './PlayPauseButton';
import PrevButton from './PrevButton';

interface Props {}

const PlaybackButtons: React.ComponentType<Props> = ({}) => (
  <div>
    <PrevButton />
    <PlayPauseButton />
    <NextButton />
  </div>
);

export default PlaybackButtons;
