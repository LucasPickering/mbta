import IconButton from '@material-ui/core/IconButton';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import React, { useContext } from 'react';
import { MapActionType, MapContext } from '../../state/map';

interface Props {}

const NextButton: React.ComponentType<Props> = ({}) => {
  const [, dispatch] = useContext(MapContext);

  return (
    <IconButton
      onClick={() => {
        dispatch({ type: MapActionType.IncrActiveIndex });
        dispatch({ type: MapActionType.SetPlaying, value: false });
      }}
    >
      <NavigateNextIcon />
    </IconButton>
  );
};

export default NextButton;
