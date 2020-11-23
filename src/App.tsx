import React from 'react';
import TemperatureStatsSummaryContainer from 'components/TemperatureStatsSummaryContainer';
import CameraViewer from 'components/CameraViewer';
import Typography from '@material-ui/core/Typography';
// Using this as a convenience because it handles breakpoints
import Grid from '@material-ui/core/Grid';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  gridItem: {
    padding: theme.spacing(2),
  },
}));

const App: React.FC = () => {
  const classes = useStyles();
  return (
    <Grid container>
      <Grid className={classes.gridItem} item xs={12} md={6}>
        <Typography variant="h4" gutterBottom>
          Temperature Stats
        </Typography>
        <TemperatureStatsSummaryContainer />
      </Grid>
      <Grid className={classes.gridItem} item xs={12} md={6}>
        <Typography variant="h4" gutterBottom>
          Camera
        </Typography>
        <CameraViewer />
      </Grid>
    </Grid>
  );
};

export default App;
