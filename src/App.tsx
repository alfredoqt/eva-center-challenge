import React from 'react';
import TemperatureStatsSummaryContainer from 'components/TemperatureStatsSummaryContainer';
import CameraViewer from 'components/CameraViewer';

function App() {
  return (
    <div>
      <TemperatureStatsSummaryContainer />
      <CameraViewer />
    </div>
  );
}

export default App;
