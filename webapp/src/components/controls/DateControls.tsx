import { Theme } from '@material-ui/core';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import MenuIcon from '@material-ui/icons/Menu';
import { makeStyles } from '@material-ui/styles';
import classNames from 'classnames';
import React, { useReducer, useState } from 'react';
import Control from 'react-leaflet-control';
import {
  DatesDispatchContext,
  datesReducer,
  DatesState,
  DatesStateContext,
  defaultDatesState,
} from '../../state/dates';
import useStyles from '../../useStyles';
import DateRangeControls from './DateRangeControls';
import DayOfWeekControls from './DayOfWeekControls';
import LoadDataButton from './LoadDataButton';

const useLocalStyles = makeStyles(({ spacing }: Theme) => ({
  drawer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: spacing.unit,
    '& > *': {
      margin: spacing.unit,
    },
  },
  hideButton: {
    alignSelf: 'end',
  },
}));

interface Props {
  intervalsLoading: boolean;
  onView: (state: DatesState) => void;
}

const DateControls: React.ComponentType<Props> = ({
  intervalsLoading,
  onView,
}) => {
  const [drawerOpen, setDrawerOpen] = useState<boolean>(true);
  const classes = useStyles();
  const localClasses = useLocalStyles();

  const [datesState, datesDispatch] = useReducer(
    datesReducer,
    defaultDatesState
  );

  return (
    <DatesStateContext.Provider value={datesState}>
      <DatesDispatchContext.Provider value={datesDispatch}>
        {/* The button on the map */}
        <Control position="topleft">
          <IconButton
            color="inherit"
            aria-label="Open drawer"
            onClick={() => setDrawerOpen(true)}
            className={classNames(drawerOpen && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
        </Control>

        <Drawer variant="persistent" anchor="left" open={drawerOpen}>
          <div className={localClasses.drawer}>
            <IconButton
              className={localClasses.hideButton}
              onClick={() => setDrawerOpen(false)}
            >
              <ChevronLeftIcon />
            </IconButton>
            <DayOfWeekControls />
            <DateRangeControls />
            <LoadDataButton loading={intervalsLoading} onView={onView} />
          </div>
        </Drawer>
      </DatesDispatchContext.Provider>
    </DatesStateContext.Provider>
  );
};

export default DateControls;
