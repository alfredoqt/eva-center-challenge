import React from 'react';
import {cleanup, render} from '@testing-library/react';
import {TemperatureStats} from 'constants/TemperatureStatsTypes';
import TemperatureStatsSummary from 'components/TemperatureStatsSummary';

const MOCK_STATS: TemperatureStats = {
  ambientTemperture: 24.3,
  exteriorTemperature: 20.5,
  patientTemperature: 36.5,
  risk: 'high',
};

test('TemperatureStatsSummary', () => {
  afterEach(cleanup);
  it('Renders warning when the risk is high', () => {
    const {queryAllByText} = render(
      <TemperatureStatsSummary stats={MOCK_STATS} />,
    );
    expect(queryAllByText(/The patient's risk is high!/).length).toBe(1);
  });
});
