import { Theme } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/styles';
import React from 'react';
import DateRangeControls from './DateRangeControls';
import DayOfWeekControls from './DayOfWeekControls';

const useLocalStyles = makeStyles(({ spacing }: Theme) => ({
  root: { padding: spacing.unit },
}));

interface Props {}

const SeriesDateControls: React.ComponentType<Props> = ({}) => {
  const localClasses = useLocalStyles();

  return (
    <Paper className={localClasses.root}>
      <DayOfWeekControls />
      <DateRangeControls />
    </Paper>
  );
};

export default SeriesDateControls;
