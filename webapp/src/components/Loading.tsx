import { Theme } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/styles';
import React from 'react';

const useLocalStyles = makeStyles(({  }: Theme) => ({}));

interface Props {
  loading: boolean;
}

const Loading: React.ComponentType<Props> = React.memo(({ loading }) => {
  return loading ? <div>Loading...</div> : <></>;
});

export default Loading;
