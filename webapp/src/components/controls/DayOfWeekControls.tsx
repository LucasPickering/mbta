import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import React, { useContext } from 'react';
import {
  DatesActionType,
  DatesDispatchContext,
  DatesStateContext,
} from '../../state/dates';
import { DayOfWeek } from '../../types';

const DAY_LABELS = {
  [DayOfWeek.Sunday]: 'S',
  [DayOfWeek.Monday]: 'M',
  [DayOfWeek.Tuesday]: 'T',
  [DayOfWeek.Wednesday]: 'W',
  [DayOfWeek.Thursday]: 'T',
  [DayOfWeek.Friday]: 'F',
  [DayOfWeek.Saturday]: 'S',
};

interface Props {}

const DayOfWeekControls: React.ComponentType<Props> = ({}) => {
  const { daysOfWeek } = useContext(DatesStateContext);
  const dispatch = useContext(DatesDispatchContext);

  return (
    <ToggleButtonGroup
      value={daysOfWeek}
      selected
      onChange={(_, days) =>
        dispatch({ type: DatesActionType.SetDaysOfWeek, value: days })
      }
    >
      {Object.entries(DAY_LABELS).map(([key, label]) => (
        <ToggleButton key={key} value={key}>
          {label}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
};

export default DayOfWeekControls;
