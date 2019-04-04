import Toolbar from '@material-ui/core/Toolbar';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import React, { useContext } from 'react';

import { DatesActionType, DatesContext } from '../../state/dates';
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

const MapControls: React.ComponentType<Props> = ({}) => {
  const [{ daysOfWeek }, dispatch] = useContext(DatesContext);

  return (
    <Toolbar style={{ justifyContent: 'center' }}>
      <ToggleButtonGroup
        value={daysOfWeek}
        onChange={(_, day) =>
          dispatch({ type: DatesActionType.ToggleDaysOfWeek, value: day })
        }
      >
        {Object.entries(DAY_LABELS).map(([key, label]) => (
          <ToggleButton key={key} value={key}>
            {label}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
    </Toolbar>
  );
};

export default MapControls;
