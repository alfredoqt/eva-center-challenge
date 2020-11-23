/**
 *  Module that contains utility functions for handling images
 */

/**
 * Fetches an image as a blob from a URL
 * @param {string} url URL of image to be loaded
 * @returns {Promise<Blob>}
 */
export function fetchImage(url: string): Promise<Blob> {
  return fetch(url).then((response) => response.blob());
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
