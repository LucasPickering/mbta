import IconButton from '@material-ui/core/IconButton';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import React, { useContext, useCallback } from 'react';
import { MapActionType, MapDispatchContext } from '../../state/map';

interface Props {}

const PrevButton: React.ComponentType<Props> = ({}) => {
  const dispatch = useContext(MapDispatchContext);
  const onClick = useCallback(() => {
    dispatch({ type: MapActionType.DecrActiveIndex });
    dispatch({ type: MapActionType.SetPlaying, value: false });
  }, [dispatch]);

  return (
    <IconButton onClick={onClick}>
      <NavigateBeforeIcon />
    </IconButton>
  );
};

export default PrevButton;
