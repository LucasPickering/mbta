import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import React from 'react';
import { Popup as LeafletPopup } from 'react-leaflet';

const useLocalStyles = makeStyles(({ spacing }: Theme) => ({
  root: {},
}));

const Popup: React.ComponentType<
  React.ComponentProps<typeof LeafletPopup>
> = props => {
  const localClasses = useLocalStyles();
  return <LeafletPopup className={localClasses.root} {...props} />;
};

export default Popup;
