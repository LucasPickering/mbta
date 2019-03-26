import classNames from 'classnames';
import React from 'react';

import classes from './App.module.css';
import Map from './Map';

interface Props {}

const App: React.ComponentType<Props> = () => (
  <div className={classNames('full-size', classes.App)}>
    <Map />
  </div>
);

export default App;
