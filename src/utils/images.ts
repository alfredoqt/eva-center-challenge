/**
 *  Module that contains utility functions for handling images
 */

import {ERROR_CODE_IMAGE_TIMEOUT} from 'constants/ErrorCodes';

/**
 * Fetches an image as a blob from a URL
 * @param {RequestInfo} url URL of image to be loaded
 * @param {RequestInit} [init] options passed to fetch
 * @returns {Promise<Blob>}
 */
export function fetchImage(
  url: RequestInfo,
  init?: RequestInit,
): Promise<Blob> {
  return fetch(url, init).then((response) => response.blob());
}

/**
 * Fetches an image as a blob from a URL with a specified max timeout
 * @param {RequestInfo} url URL of image to be loaded
 * @param {number} ms Passed to setTimeout
 * @returns {Promise<Blob>}
 */
export function fetchImageWithTimeout(
  url: RequestInfo,
  ms: number,
): Promise<Blob> {
  return new Promise((resolve, reject) => {
    // To abort the request
    const controller = new AbortController();
    const timeoutID = setTimeout(() => {
      controller.abort();
      reject(new Error(ERROR_CODE_IMAGE_TIMEOUT));
    }, ms);

    fetchImage(url, {
      signal: controller.signal,
    })
      .then((blob) => {
        clearTimeout(timeoutID);
        resolve(blob);
      })
      .catch((error) => {
        clearTimeout(timeoutID);
        reject(error);
      });
  });
}

/**
 * Downloads a file asigning a same location URL to an anchor tag as the
 * href parameter, and assigns a filename to the download parameter
 * @param {string} filename To be given to downloaded file
 * @param {string} url URL of the file, might be a Blob URL
 */
export function downloadFile(filename: string, url: string): void {
  const downloadLink = document.createElement('a');
  document.body.appendChild(downloadLink);
  downloadLink.href = url;
  downloadLink.download = filename;
  // Trigger a click to save the file
  downloadLink.click();
}
