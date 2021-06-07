import { datatype } from 'faker';

export const splitAndConvert = <T>(
  parameters: string,
  parser: (parsed: string) => T,
  filterer: (parsed: T) => boolean,
  separator: string,
): T[] =>
  parameters
    ?.split(separator)
    .map((parameter) => parser(parameter))
    .filter((parameter) => filterer(parameter));

export const splitByCommaAndConvertToNumber = (parameters: string): number[] =>
  splitAndConvert(parameters, Number.parseInt, (parameter) => !Number.isNaN(parameter), ',');

export const randomNumber = ({ min, max = 1_000_000 }: { min?: number; max?: number } = {}): number =>
  min ? datatype.number({ min: min, max }) : datatype.number(max);

export const randomArrayMember = <T>(array: T[]): T => array[Math.floor(Math.random() * array.length)];

export const isValidDate = <T>(d: T): boolean => d instanceof Date && !Number.isNaN(d);

export const getRandomDate = (from: Date, to: Date): Date => {
  const fromTime = from.getTime();
  const toTime = to.getTime();
  return new Date(fromTime + Math.random() * (toTime - fromTime));
};
