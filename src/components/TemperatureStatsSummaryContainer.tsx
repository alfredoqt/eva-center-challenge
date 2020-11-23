import React, {useState, useEffect} from 'react';
import {TemperatureStats} from 'constants/TemperatureStatsTypes';
import {fetchStats} from 'utils/api';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import TemperatureStatsSummary from 'components/TemperatureStatsSummary';

const TemperatureStatsSummaryContainer: React.FC = () => {
  const [stats, setStats] = useState<TemperatureStats | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadStats() {
      try {
        const data = await fetchStats();
        // Uncomment this line and comment the next one to see the high risk warning.
        // Tested under __tests__
        // setStats({...data, risk: 'high'});
        setStats(data);
      } catch {
        setError('Error fetching stats');
      }
    }

    // Every two seconds, following requirements
    let interval = setInterval(loadStats, 2000);
    return function () {
      // Clear interval on cleanup function
      clearInterval(interval);
    };
  }, [setStats, setError]);

  if (error) {
    return <Typography>{error}</Typography>;
  }

  // Will only show the progress the first time it's loading
  return stats ? (
    <TemperatureStatsSummary stats={stats} />
  ) : (
    <CircularProgress />
  );
};

export default TemperatureStatsSummaryContainer;
