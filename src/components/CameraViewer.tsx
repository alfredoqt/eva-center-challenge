import React, {useCallback, useEffect, useState} from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import {fetchImageWithTimeout, downloadFile} from 'utils/images';
import {BASE_URL} from 'utils/api';
import {MINUTES_TO_MS} from 'utils/time';
import {ERROR_CODE_IMAGE_TIMEOUT} from 'constants/ErrorCodes';
import CircularProgress from '@material-ui/core/CircularProgress';

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
  image: {
    maxWidth: '100%',
    height: 'auto',
  },
}));

/**
 * Loads the image from the camera, and allows it to be downloaded
 */
const CameraViewer: React.FC = () => {
  const [retryCount, setRetryCount] = useState(0);
  const [imageURL, setImageURL] = useState<string | null>(null);
  const classes = useStyles();
  const [imageLoadedTimestamp, setImageLoadedTimestamp] = useState<
    number | null
  >(null);
  const [imageError, setImageError] = useState<string | null>(null);

  const fetchFromCamera = useCallback(async () => {
    try {
      const image = await fetchImageWithTimeout(
        `${BASE_URL}/preview`,
        MINUTES_TO_MS,
      );
      if (image.size === 0) {
        setImageError('Image could not be downloaded');
        return;
      }
      const url = URL.createObjectURL(image);
      setImageURL(url);
      setImageLoadedTimestamp(Date.now());
    } catch (e) {
      if (e instanceof Error && e.message === ERROR_CODE_IMAGE_TIMEOUT) {
        setImageError('Image hung for more than one second');
        return;
      }
      setImageError('Image could not be downloaded');
    }
  }, [setImageError, setImageURL, setImageLoadedTimestamp]);

  useEffect(() => {
    fetchFromCamera();
  }, [fetchFromCamera, retryCount]);

  const onDownload = useCallback(() => {
    if (imageURL) {
      let filename;
      if (imageLoadedTimestamp) {
        filename = `${new Date(imageLoadedTimestamp).toISOString()}.jpg`;
      } else {
        filename = `${new Date().toISOString()}.jpg`;
      }
      downloadFile(filename, imageURL);
    }
  }, [imageLoadedTimestamp, imageURL]);

  return (
    <div className={classes.root}>
      {imageURL ? (
        <img className={classes.image} alt="Patient's Preview" src={imageURL} />
      ) : null}
      {imageError === null && imageLoadedTimestamp === null ? (
        <CircularProgress />
      ) : null}
      {imageLoadedTimestamp ? (
        <Typography>{`Image loaded at: ${new Date(
          imageLoadedTimestamp,
        ).toISOString()}`}</Typography>
      ) : null}
      {imageError ? (
        <div>
          <Typography color="error" gutterBottom>
            {imageError}
          </Typography>
          <Button
            color="primary"
            variant="contained"
            onClick={() => setRetryCount(retryCount + 1)}
          >
            Retry Download
          </Button>
        </div>
      ) : null}
      {imageURL ? (
        <Button color="primary" variant="contained" onClick={onDownload}>
          Download Image
        </Button>
      ) : null}
    </div>
  );
};

export default CameraViewer;
