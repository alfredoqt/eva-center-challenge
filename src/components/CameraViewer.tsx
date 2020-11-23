import React, {useEffect, useState} from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import {fetchImage, downloadFile} from 'utils/images';
import {BASE_URL} from 'utils/api';
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
  const classes = useStyles();
  const [imageLoadedTimestamp, setImageLoadedTimestamp] = useState<
    string | null
  >(null);
  const [imageError, setImageError] = useState<string | null>(null);

  useEffect(() => {
    // Handle image load timeout
    let timeout = setTimeout(() => {
      if (imageLoadedTimestamp === null) {
        setImageError('Image did not load after one minute');
      }
    }, MINUTES_TO_MS);
    return function () {
      clearTimeout(timeout);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // We don't want this to recreate when imageLoadedTimestamp changes

  // Not using useCallback here because there's nothing to be optimized
  // useCallback would have a lower performance than just using a non memoized
  // function here since the component does not have a lot of re-renders
  function onLoad() {
    const loadedAt = Date.now();
    setImageLoadedTimestamp(new Date(loadedAt).toISOString());
  }

  function onError() {
    setImageError('Image could not be loaded');
  }

  async function onDownload() {
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
  }

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
      <Button color="primary" variant="contained" onClick={onDownload}>
        Download Image
      </Button>
    </div>
  );
};

export default CameraViewer;
