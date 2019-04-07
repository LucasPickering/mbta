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
  DatesContext,
  datesReducer,
  defaultDatesState,
} from '../../state/dates';
import DateRangeControls from './DateRangeControls';
import DayOfWeekControls from './DayOfWeekControls';

const useLocalStyles = makeStyles(({ spacing }: Theme) => ({
  drawer: {},
  drawerHeader: {
    display: 'flex',
    justifyContent: 'end',
  },
  drawerBody: {
    padding: spacing.unit,
  },
  hide: {
    display: 'none',
  },
}));

interface Props {}

const DateControls: React.ComponentType<Props> = ({}) => {
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
  const localClasses = useLocalStyles();

  return (
    <DatesContext.Provider value={useReducer(datesReducer, defaultDatesState)}>
      <Control position="topleft">
        <IconButton
          color="inherit"
          aria-label="Open drawer"
          onClick={() => setDrawerOpen(true)}
          className={classNames(drawerOpen && localClasses.hide)}
        >
          <MenuIcon />
        </IconButton>
      </Control>

      <Drawer
        className={localClasses.drawer}
        variant="persistent"
        anchor="left"
        open={drawerOpen}
      >
        <div className={localClasses.drawerHeader}>
          <IconButton onClick={() => setDrawerOpen(false)}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <div className={localClasses.drawerBody}>
          <DayOfWeekControls />
          <DateRangeControls />
        </div>
      </Drawer>
    </DatesContext.Provider>
  );
};

export default DateControls;
