import IconButton from '@material-ui/core/IconButton';
import PauseIcon from '@material-ui/icons/Pause';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import React, { useContext } from 'react';
import {
  MapActionType,
  MapDispatchContext,
  MapStateContext,
} from '../../state/map';

interface Props {}

const PlayPauseButton: React.ComponentType<Props> = ({}) => {
  const { playing } = useContext(MapStateContext);
  const dispatch = useContext(MapDispatchContext);

  return (
    <IconButton onClick={() => dispatch({ type: MapActionType.TogglePlaying })}>
      {playing ? <PauseIcon /> : <PlayArrowIcon />}
    </IconButton>
  );
};

export default PlayPauseButton;
