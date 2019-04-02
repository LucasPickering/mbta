import { makeApiKit } from '../state/api';
import { Station } from '../types';

export const {
  reducer: stationsReducer,
  context: StationsContext,
} = makeApiKit<Station[]>();
