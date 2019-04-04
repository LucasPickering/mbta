import Paper from '@material-ui/core/Paper';
import { DatePicker } from 'material-ui-pickers';
import React, { useContext } from 'react';

import {
  DatesActionType,
  DatesContext,
  VALID_DATE_RANGE,
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
  const [
    {
      dateRange: [startDate, endDate],
    },
    dispatch,
  ] = useContext(DatesContext);

  // NOTE: date-fns uses null as empty but we use undefined, so we have to
  // convert back and forth in a few places

  return (
    <Paper>
      <DatePickerHelper
        label="Start Date"
        value={startDate || null}
        minDate={VALID_DATE_RANGE[0]}
        maxDate={endDate || VALID_DATE_RANGE[1]}
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
        minDate={startDate || VALID_DATE_RANGE[0]}
        maxDate={VALID_DATE_RANGE[1]}
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
