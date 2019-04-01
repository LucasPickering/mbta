export interface Color {
  r: number;
  g: number;
  b: number;
}

export interface Interval {
  start_time: number;
  entries: number;
}

export interface Station {
  gtfs_id: string;
  name: string;
  lines: string[];
  lat: number;
  lon: number;
}

export interface StationSet {
  [station: string]: Station;
}

export type IntervalSet = Interval[];
export interface StationIntervals {
  [station: string]: {
    [startTime: string]: number;
  };
}

export interface Series {
  summary: IntervalSet;
  stations: StationIntervals;
}

export interface SeriesSet {
  [seriesName: string]: Series;
}
