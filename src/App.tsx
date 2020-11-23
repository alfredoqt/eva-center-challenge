import React from 'react';
import TemperatureStatsSummaryContainer from 'components/TemperatureStatsSummaryContainer';

// async function download() {
//   const image = await getImage(
//     'https://fake-img-endpoint.vercel.app/api/preview',
//   );
//   const url = URL.createObjectURL(image);
//   const filename = `${Date.now()}.jpg`;
//   downloadFile(filename, url);
// }

function App() {
  return (
    <div>
      <TemperatureStatsSummaryContainer />
    </div>
  );
}

export default App;
