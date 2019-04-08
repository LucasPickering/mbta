import { format } from 'date-fns';
import { capitalize } from 'lodash-es';

const INTERVAL_LENGTH = 15; // minutes
const TIME_FORMAT = 'h:mm aa';

export function getHoursMinutes(time: number): [number, number] {
  return [Math.floor(time / 100), time % 100];
}

export function formatTime(time: number): string {
  const [hours, minutes] = getHoursMinutes(time);
  const d = new Date(0, 0, 0, hours, minutes);
  return format(d, TIME_FORMAT);
}

export function getEndTime(startTime: number): number {
  return startTime + INTERVAL_LENGTH;
}

export function formatLines(lines: string[]): string {
  return lines.map(line => `${capitalize(line)} Line`).join(', ');
}

export function mod(a: number, b: number): number {
  return ((a % b) + b) % b;
}
