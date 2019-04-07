import Typography from '@material-ui/core/Typography';
import React from 'react';

import { formatTime, getEndTime } from '../../util';

interface Props {
  activeTime: number;
}

const IntervalDisplay: React.ComponentType<Props> = ({ activeTime }) => (
  <Typography variant="display1">
    {formatTime(activeTime)}-{formatTime(getEndTime(activeTime))}
  </Typography>
);

export default IntervalDisplay;
