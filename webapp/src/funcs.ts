import { capitalize, mean, pad } from 'lodash-es';

export function formatTime(time: number): string {
  const minutes = time % 100;
  const hours = Math.floor(time / 100);
  return `${hours}:${pad(minutes.toString(), 2, '0')}`;
}

export function formatLines(lines: string[]): string {
  return lines.map(line => `${capitalize(line)} Line`).join(', ');
}

export function mod(a: number, b: number): number {
  return ((a % b) + b) % b;
}
