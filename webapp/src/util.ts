import { format } from 'date-fns';
import { capitalize, unzip } from 'lodash-es';

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

export function downloadCsv(
  filename: string,
  labels: string[],
  data: string[][]
) {
  const rows = [labels, ...data];

  // Join each row with commas, then join rows together with newlines
  const bodyStr = rows.map(row => row.join(',')).join('\n');
  const blob = new Blob([bodyStr], { type: 'text/csv;charset=utf-8;' });

  // Ugh
  const link = document.createElement('a');
  link.setAttribute('href', URL.createObjectURL(blob));
  link.setAttribute('download', `${filename}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
