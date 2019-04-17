export enum Line {
  Blue = 'B',
  Green = 'G',
  Orange = 'O',
  Red = 'R',
  Silver = 'S',
}

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

export interface Station {
  gtfs_id: string;
  name: string;
  lines: string[];
  lat: number;
  lon: number;
}

export interface IntervalSet {
  [startTime: string]: number;
}

export interface StationIntervals {
  [station: string]: IntervalSet;
}

export interface Series {
  summary: IntervalSet;
  stations: StationIntervals;
}

export interface SeriesSet {
  [seriesName: string]: Series;
}
