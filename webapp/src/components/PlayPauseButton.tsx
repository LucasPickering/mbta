import IconButton from '@material-ui/core/IconButton';
import PauseIcon from '@material-ui/icons/Pause';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import React, { useContext } from 'react';

import { MapActionType, MapContext } from '../state/map';

interface Props {}

const PlayPauseButton: React.ComponentType<Props> = ({}) => {
  const [{ playing }, dispatch] = useContext(MapContext);

  return (
    <IconButton onClick={() => dispatch({ type: MapActionType.TogglePlaying })}>
      {playing ? <PauseIcon /> : <PlayArrowIcon />}
    </IconButton>
  );
};

export default PlayPauseButton;
