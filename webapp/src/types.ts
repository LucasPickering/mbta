export interface Interval {
  start_time: number;
  entries: number;
}

export type IntervalSet = Interval[];

export interface Series {
  summary: IntervalSet;
  stations: { [station: string]: IntervalSet };
}

export interface SeriesSet {
  [seriesName: string]: Series;
}
