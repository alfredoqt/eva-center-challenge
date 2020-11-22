// Module that contains utility functions for handling images

// Fetches an image as a blob from a URL
export function getImage(url: string): Promise<Blob> {
  return fetch(url).then((response) => response.blob());
}

// Downloads a file asigning a same location URL to an anchor tag
// as the href parameter, and assigns a filename to the download
// parameter
export function downloadFile(filename: string, url: string): void {
  const downloadLink = document.createElement('a');
  document.body.appendChild(downloadLink);
  downloadLink.href = url;
  downloadLink.download = filename;
  // Trigger a click to save the file
  downloadLink.click();
}
