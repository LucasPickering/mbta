import IconButton from '@material-ui/core/IconButton';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import React, { useContext } from 'react';
import { MapActionType, MapDispatchContext } from '../../state/map';

interface Props {}

const PrevButton: React.ComponentType<Props> = ({}) => {
  const dispatch = useContext(MapDispatchContext);

  return (
    <IconButton
      onClick={() => {
        dispatch({ type: MapActionType.DecrActiveIndex });
        dispatch({ type: MapActionType.SetPlaying, value: false });
      }}
    >
      <NavigateBeforeIcon />
    </IconButton>
  );
};

export default PrevButton;
