import Toolbar from '@material-ui/core/Toolbar';
import React, { useReducer } from 'react';

import {
  DatesContext,
  datesReducer,
  defaultDatesState,
} from '../../state/dates';
import DateRangeControls from './DateRangeControls';
import DayOfWeekControls from './DayOfWeekControls';

interface Props {}

const DateControls: React.ComponentType<Props> = ({}) => {
  return (
    <DatesContext.Provider value={useReducer(datesReducer, defaultDatesState)}>
      <Toolbar>
        <DayOfWeekControls />
        <DateRangeControls />
      </Toolbar>
    </DatesContext.Provider>
  );
};

export default DateControls;
