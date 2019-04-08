import Button from '@material-ui/core/Button';
import React, { useContext } from 'react';
import { DatesContext, DatesState } from '../../state/dates';

interface Props {
  onView: (datesState: DatesState) => void;
}

const LoadDataButton: React.ComponentType<Props> = ({ onView }) => {
  const [datesState] = useContext(DatesContext);

  return (
    <Button
      variant="contained"
      color="primary"
      onClick={() => onView(datesState)}
    >
      View
    </Button>
  );
};

export default LoadDataButton;
