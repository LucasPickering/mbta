import { flatten } from 'lodash-es';
import React, { useContext } from 'react';
import { MapStateContext } from '../../state/map';
import { StationIntervals } from '../../types';
import CsvButton from '../CsvButton';

const HEADERS = ['Station', 'Time', 'Entries'];

function transformData(data: StationIntervals): string[][] {
  // Build an array, with one subarray for each station
  const nestedRows = Object.entries(data).map(([station, intervals]) =>
    // One row for each interval at this station
    Object.entries(intervals).map(([time, entries]) => [
      station,
      time.toString(),
      entries.toString(),
    ])
  );

  // Flatten all the station arrays into one big array
  return flatten(nestedRows);
}

interface Props {}

const SeriesCsvButton: React.ComponentType<Props> = ({}) => {
  const { data } = useContext(MapStateContext);
  // This component should only be rendered when data is present
  const {
    intervals: { stations },
  } = data!;

  return (
    <CsvButton
      filename="series"
      headers={HEADERS}
      data={stations}
      transformData={transformData}
    />
  );
};

export default SeriesCsvButton;
