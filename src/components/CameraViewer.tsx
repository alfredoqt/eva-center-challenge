import React, {useCallback, useState} from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import {fetchImage, downloadFile} from 'utils/images';
import {BASE_URL} from 'utils/api';
import useTimeout from 'hooks/useTimeout';
import {MINUTES_TO_MS} from 'utils/time';

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

/**
 * Loads the image from the camera, and allows it to be downloaded
 */
const CameraViewer: React.FC = () => {
  const imageTimeoutPending = useTimeout(MINUTES_TO_MS);
  const classes = useStyles();
  const [imageLoadedTimestamp, setImageLoadedTimestamp] = useState<
    string | null
  >(null);
  const [imageError, setImageError] = useState<string | null>(null);

  // Using useCallback here because there might be some re-renders
  // and this will memoize the function.
  // Not sure if it will improve performance, but still a good practice
  const onLoad = useCallback(() => {
    const loadedAt = Date.now();
    setImageLoadedTimestamp(new Date(loadedAt).toISOString());
  }, [setImageLoadedTimestamp]);

  const onError = useCallback(() => {
    setImageError('Image could not be loaded');
  }, [setImageError]);

  const onDownload = useCallback(async () => {
    try {
      const image = await fetchImage(`${BASE_URL}/preview`);
      const url = URL.createObjectURL(image);
      let filename;
      if (imageLoadedTimestamp) {
        filename = `${imageLoadedTimestamp}.jpg`;
      } else {
        filename = `${new Date().toISOString()}.jpg`;
      }
      downloadFile(filename, url);
    } catch {
      setImageError('Image could not be downloaded');
    }
  }, [setImageError, imageLoadedTimestamp]);

  return (
    <div className={classes.root}>
      <img
        alt="Patient's Preview"
        src={`${BASE_URL}/preview`}
        onLoad={onLoad}
        onError={onError}
      />
      {imageLoadedTimestamp ? (
        <Typography>{`Image loaded at: ${imageLoadedTimestamp}`}</Typography>
      ) : null}
      {imageError ? <Typography color="error">{imageError}</Typography> : null}
      {!imageTimeoutPending && imageLoadedTimestamp === null ? (
        <Typography color="error">
          Image didn't load after one minute
        </Typography>
      ) : null}
      <Button color="primary" variant="contained" onClick={onDownload}>
        Download Image
      </Button>
    </div>
  );
};

export default CameraViewer;
