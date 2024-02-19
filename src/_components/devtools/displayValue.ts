import { serialize } from "superjson";

/**
 * Displays a string regardless the type of the data
 * @param {unknown} value Value to be stringified
 * @param {boolean} beautify Formats json to multiline
 */
export const displayValue = (value: unknown, beautify: boolean = false) => {
  const { json } = serialize(value);

  return JSON.stringify(json, null, beautify ? 2 : undefined);
};
