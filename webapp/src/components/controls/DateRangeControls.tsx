import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { DatePicker } from 'material-ui-pickers';
import React, { useCallback, useContext } from 'react';
import {
  DatesActionType,
  DatesDispatchContext,
  DatesStateContext,
} from '../../state/dates';

const useLocalStyles = makeStyles(({ spacing }: Theme) => ({
  root: { paddingTop: spacing.unit },
}));

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
  const localClasses = useLocalStyles();
  const {
    validDateRange: [validStartDate, validEndDate],
    dateRange: [startDate, endDate],
  } = useContext(DatesStateContext);
  const dispatch = useContext(DatesDispatchContext);

  // NOTE: date-fns uses null as empty but we use undefined, so we have to
  // convert back and forth in a few places
  const startDateCallback = useCallback(
    value =>
      dispatch({
        type: DatesActionType.SetDateRangeStart,
        value: value || undefined,
      }),
    [dispatch]
  );
  const endDateCallback = useCallback(
    value =>
      dispatch({
        type: DatesActionType.SetDateRangeEnd,
        value: value || undefined,
      }),
    [dispatch]
  );

  return (
    <div className={localClasses.root}>
      <DatePickerHelper
        label="Start Date"
        value={startDate || null}
        minDate={validStartDate}
        maxDate={endDate || validEndDate}
        // If end date is defined, you can't clear the start date
        clearable={!Boolean(endDate)}
        onChange={startDateCallback}
      />
      {/* Only show end date if a start date has been selected */}
      {startDate && (
        <DatePickerHelper
          label="End Date"
          value={endDate || null}
          minDate={startDate}
          maxDate={validEndDate}
          onChange={endDateCallback}
        />
      )}
    </div>
  );
};

export default DateRangeControls;
