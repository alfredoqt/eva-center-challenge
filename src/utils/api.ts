/**
 * Utils for API calls
 */

import {TemperatureStats} from 'constants/TemperatureStatsTypes';

export const BASE_URL = 'https://fake-img-endpoint.vercel.app/api';

/**
 * Fetches JSON data using window.fetch
 * @param {RequestInfo} requestInfo request info passed to fetch
 * @param {RequestInit} [init] options passed to fetch
 * @returns {Promise<T>}
 */
export async function fetchGetJson<T>(
  input: RequestInfo,
  init?: RequestInit,
): Promise<T> {
  const response = await fetch(input, init);
  if (response.ok) {
    const json = await response.json();
    return json;
  }
  // Throw a simple error here
  throw new Error('Error fetching');
}

/**
 * Fetches temperature stats
 * @returns {Promise<TemperatureStats>}
 */
export function fetchStats(): Promise<TemperatureStats> {
  return fetchGetJson(`${BASE_URL}/data`);
}
