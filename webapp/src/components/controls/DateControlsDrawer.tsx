import { Theme } from '@material-ui/core';
import Drawer from '@material-ui/core/Drawer';
import Fab from '@material-ui/core/Fab';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import BuildIcon from '@material-ui/icons/Build';
import { makeStyles } from '@material-ui/styles';
import classNames from 'classnames';
import React, { useCallback, useReducer, useState } from 'react';
import Control from 'react-leaflet-control';
import {
  DatesDispatchContext,
  datesReducer,
  DatesState,
  DatesStateContext,
  defaultDatesState,
} from '../../state/dates';
import useStyles from '../../useStyles';
import LoadDataButton from './LoadDataButton';
import SeriesControls from './SeriesControls';

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
    alignSelf: 'start',
  },
}));

interface Props {
  validDateRange: [Date, Date];
  intervalsLoading: boolean;
  onView: (state: DatesState) => void;
}

const DateControlsDrawer: React.ComponentType<Props> = ({
  validDateRange,
  intervalsLoading,
  onView,
}) => {
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
  const classes = useStyles();
  const localClasses = useLocalStyles();

  const [datesState, datesDispatch] = useReducer(datesReducer, {
    validDateRange,
    ...defaultDatesState,
  });
  const openDrawer = useCallback(() => setDrawerOpen(true), [setDrawerOpen]);
  const closeDrawer = useCallback(() => setDrawerOpen(false), [setDrawerOpen]);

  return (
    <DatesStateContext.Provider value={datesState}>
      <DatesDispatchContext.Provider value={datesDispatch}>
        {/* The button on the map */}
        <Control position="topleft">
          <Fab
            color="primary"
            aria-label="Open drawer"
            onClick={openDrawer}
            className={classNames(drawerOpen && classes.hide)}
          >
            <BuildIcon />
          </Fab>
        </Control>

        <Drawer variant="persistent" anchor="left" open={drawerOpen}>
          <div className={localClasses.drawer}>
            <IconButton
              className={localClasses.hideButton}
              onClick={closeDrawer}
            >
              <ChevronLeftIcon />
            </IconButton>
            <SeriesControls />
            <LoadDataButton loading={intervalsLoading} onView={onView} />
          </div>
        </Drawer>
      </DatesDispatchContext.Provider>
    </DatesStateContext.Provider>
  );
};

export default DateControlsDrawer;
