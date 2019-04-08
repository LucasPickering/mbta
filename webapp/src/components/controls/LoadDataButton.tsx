import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import React, { useContext } from 'react';
import { DatesContext, DatesState } from '../../state/dates';

interface Props {
  loading: boolean;
  onView: (datesState: DatesState) => void;
}

const LoadDataButton: React.ComponentType<Props> = ({ loading, onView }) => {
  const [datesState] = useContext(DatesContext);

  return (
    <Button
      variant="contained"
      color="primary"
      disabled={loading}
      onClick={() => onView(datesState)}
    >
      {loading ? <CircularProgress color="secondary" size={25} /> : 'View'}
    </Button>
  );
};

export default LoadDataButton;
