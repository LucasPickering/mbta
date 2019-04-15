import Paper from '@material-ui/core/Paper';
import { DatePicker } from 'material-ui-pickers';
import React, { useContext } from 'react';
import {
  DatesActionType,
  DatesDispatchContext,
  DatesStateContext,
} from '../../state/dates';

interface Props {}

// Just a convenience component to prevent having to write out common props
const DatePickerHelper: React.ComponentType<
  React.ComponentProps<typeof DatePicker>
> = props => (
  <DatePicker
    clearable
    format="MMM d, yyyy"
    views={['day', 'month', 'year']}
    {...props}
  />
);

const DateRangeControls: React.ComponentType<Props> = ({}) => {
  const {
    validDateRange: [validStartDate, validEndDate],
    dateRange: [startDate, endDate],
  } = useContext(DatesStateContext);
  const dispatch = useContext(DatesDispatchContext);

  // NOTE: date-fns uses null as empty but we use undefined, so we have to
  // convert back and forth in a few places

  return (
    <Paper>
      <DatePickerHelper
        label="Start Date"
        value={startDate || null}
        minDate={validStartDate}
        maxDate={endDate || validEndDate}
        onChange={value =>
          dispatch({
            type: DatesActionType.SetDateRangeStart,
            value: value || undefined,
          })
        }
      />
      <DatePickerHelper
        label="End Date"
        value={endDate || null}
        minDate={startDate || validStartDate}
        maxDate={validEndDate}
        onChange={value =>
          dispatch({
            type: DatesActionType.SetDateRangeEnd,
            value: value || undefined,
          })
        }
      />
    </Paper>
  );
};

export default DateRangeControls;
