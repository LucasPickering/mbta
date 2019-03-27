import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import classNames from 'classnames';
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
  <MuiThemeProvider theme={theme}>
    <div className={classNames('full-size')}>
      <MapContainer />
    </div>
  </MuiThemeProvider>
);

export default App;
