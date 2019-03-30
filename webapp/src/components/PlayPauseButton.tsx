import React from 'react';

import IconButton from '@material-ui/core/IconButton';
import PauseIcon from '@material-ui/icons/Pause';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';

interface Props {
  playing: boolean;
  setPlaying: React.Dispatch<React.SetStateAction<boolean>>;
}

const PlayPauseButton: React.ComponentType<Props> = ({
  playing,
  setPlaying,
}) => (
  <IconButton onClick={() => setPlaying(prevPlaying => !prevPlaying)}>
    {playing ? <PauseIcon /> : <PlayArrowIcon />}
  </IconButton>
);

export default PlayPauseButton;
