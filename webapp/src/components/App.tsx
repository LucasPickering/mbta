import DateFnsUtils from '@date-io/date-fns';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import classNames from 'classnames';
import { MuiPickersUtilsProvider } from 'material-ui-pickers';
import React from 'react';
import MapDataLoader from './MapDataLoader';

const theme = createMuiTheme({
  palette: {
    type: 'light',
  },
  typography: {
    useNextVariants: true,
  },
  overrides: {
    MuiFormControl: {
      root: {},
    },
  },
});

interface Props {}

const App: React.ComponentType<Props> = () => (
  <ThemeProvider theme={theme}>
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <div className={classNames('full-size')}>
        <MapDataLoader />
      </div>
    </MuiPickersUtilsProvider>
  </ThemeProvider>
);

export default App;
