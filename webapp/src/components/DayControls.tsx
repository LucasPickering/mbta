import TextField from '@material-ui/core/TextField';
import React from 'react';

interface Props {}

const DayControls: React.ComponentType<Props> = () => {
  return (
    <div style={{ height: 60 }}>
      <form noValidate>
        <TextField
          id="date"
          label="Date"
          type="date"
          defaultValue="2018-12-31"
        />
      </form>
    </div>
  );
};

export default DayControls;
