export const truncateString = (string: string, num: number): string =>
  string?.length > num ? string.substring(0, num - 1) + '...' : string;
