import React from 'react';
import TemperatureStatsSummaryContainer from 'components/TemperatureStatsSummaryContainer';
import CameraViewer from 'components/CameraViewer';

const App: React.FC = () => {
  return (
    <div>
      <TemperatureStatsSummaryContainer />
      <CameraViewer />
    </div>
  );
};

export default App;
