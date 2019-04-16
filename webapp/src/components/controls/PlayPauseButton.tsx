import IconButton from '@material-ui/core/IconButton';
import PauseIcon from '@material-ui/icons/Pause';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import React, { useCallback, useContext } from 'react';
import {
  MapActionType,
  MapDispatchContext,
  MapStateContext,
} from '../../state/map';

interface Props {}

const PlayPauseButton: React.ComponentType<Props> = ({}) => {
  const { playing } = useContext(MapStateContext);
  const dispatch = useContext(MapDispatchContext);
  const onClick = useCallback(
    () => dispatch({ type: MapActionType.TogglePlaying }),
    [dispatch]
  );

  return (
    <IconButton onClick={onClick}>
      {playing ? <PauseIcon /> : <PlayArrowIcon />}
    </IconButton>
  );
};

export default PlayPauseButton;
