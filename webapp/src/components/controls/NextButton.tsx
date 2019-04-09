import IconButton from '@material-ui/core/IconButton';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import React, { useCallback, useContext } from 'react';
import { MapActionType, MapDispatchContext } from '../../state/map';

interface Props {}

const NextButton: React.ComponentType<Props> = ({}) => {
  const dispatch = useContext(MapDispatchContext);
  const onClick = useCallback(() => {
    dispatch({ type: MapActionType.IncrActiveIndex });
    dispatch({ type: MapActionType.SetPlaying, value: false });
  }, [dispatch]);

  return (
    <IconButton onClick={onClick}>
      <NavigateNextIcon />
    </IconButton>
  );
};

export default NextButton;
