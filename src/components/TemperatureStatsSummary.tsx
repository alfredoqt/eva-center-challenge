import React from 'react';
import Typography from '@material-ui/core/Typography';
import {TemperatureStats} from 'constants/TemperatureStatsTypes';
import Alert from '@material-ui/lab/Alert';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'start',
    width: '100%',
    '& > *': {
      marginBottom: theme.spacing(2),
    },
  },
}));

type Props = {
  stats: TemperatureStats;
};

/**
 * Presents temperature stats
 */
const TemperatureStatsSummary: React.FC<Props> = ({stats}: Props) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      {stats.risk === 'high' ? (
        <Alert elevation={6} variant="filled" severity="warning">
          The patient's risk is high!
        </Alert>
      ) : null}
      <Typography>{`Ambient temperature: ${stats.ambientTemperture}`}</Typography>
      <Typography>{`Exterior temperature: ${stats.exteriorTemperature}`}</Typography>
      <Typography>{`Patient temperature: ${stats.patientTemperature}`}</Typography>
      <Typography>{`Risk: ${stats.risk}`}</Typography>
    </div>
  );
};

export default TemperatureStatsSummary;
