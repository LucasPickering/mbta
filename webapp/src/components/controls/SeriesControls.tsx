import { Theme } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/styles';
import React from 'react';
import DateRangeControls from './DateRangeControls';
import DayOfWeekControls from './DayOfWeekControls';
import LineControls from './LineControls';

const useLocalStyles = makeStyles(({ spacing }: Theme) => ({
  root: {
    '&>*': {
      margin: spacing.unit,
    },
  },
}));

interface Props {}

const SeriesControls: React.ComponentType<Props> = ({}) => {
  const localClasses = useLocalStyles();

  return (
    <Paper className={localClasses.root}>
      <LineControls />
      <DayOfWeekControls />
      <DateRangeControls />
    </Paper>
  );
};

export default SeriesControls;
