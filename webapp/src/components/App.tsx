import DateFnsUtils from '@date-io/date-fns';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import classNames from 'classnames';
import { MuiPickersUtilsProvider } from 'material-ui-pickers';
import React from 'react';
import MapContainer from './MapContainer';

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
        <MapContainer />
      </div>
    </MuiPickersUtilsProvider>
  </ThemeProvider>
);

export default App;
