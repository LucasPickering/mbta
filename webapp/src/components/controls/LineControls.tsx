import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import React, { useContext } from 'react';
import {
  DatesActionType,
  DatesDispatchContext,
  DatesStateContext,
} from '../../state/dates';
import { Line } from '../../types';

const LINE_LABELS = {
  [Line.Blue]: 'Blue',
  [Line.Green]: 'Green',
  [Line.Orange]: 'Orange',
  [Line.Red]: 'Red',
  [Line.Silver]: 'Silver',
};

interface Props {}

const LineControls: React.ComponentType<Props> = ({}) => {
  const { lines } = useContext(DatesStateContext);
  const dispatch = useContext(DatesDispatchContext);

  return (
    <ToggleButtonGroup
      value={lines}
      selected
      onChange={(_, newLines) =>
        dispatch({ type: DatesActionType.SetLines, value: newLines })
      }
    >
      {Object.entries(LINE_LABELS).map(([key, label]) => (
        <ToggleButton key={key} value={key} style={{}}>
          {label}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
};

export default LineControls;
