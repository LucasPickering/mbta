export enum DayOfWeek {
  Sunday = 'S',
  Monday = 'M',
  Tuesday = 'T',
  Wednesday = 'W',
  Thursday = 'R',
  Friday = 'F',
  Saturday = 'U',
}

export interface DateWildcard {
  year?: string;
  month?: string;
  day?: string;
}

export interface Interval {
  start_time: number;
  avg_entries: number;
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
