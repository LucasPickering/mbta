import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider, useTheme } from '@material-ui/styles';
import classNames from 'classnames';
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
    <div className={classNames('full-size')}>
      <MapDataLoader />
    </div>
  </ThemeProvider>
);

export default App;
