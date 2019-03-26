import classNames from 'classnames';
import React from 'react';

import classes from './App.module.css';
import MapContainer from './MapContainer';

interface Props {}

const App: React.ComponentType<Props> = () => (
  <div className={classNames('full-size', classes.App)}>
    <MapContainer />
  </div>
);

export default App;
