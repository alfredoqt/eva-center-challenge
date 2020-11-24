import React, {useCallback, useEffect, useState} from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import {fetchImage, downloadFile} from 'utils/images';
import {BASE_URL} from 'utils/api';

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
  const [imageURL, setImageURL] = useState<string | null>(null);
  const classes = useStyles();
  const [imageLoadedTimestamp, setImageLoadedTimestamp] = useState<
    number | null
  >(null);
  const [imageError, setImageError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchFromCamera() {
      try {
        const image = await fetchImage(`${BASE_URL}/preview`);
        if (image.size === 0) {
          setImageError('Image could not be downloaded');
          return;
        }
        const url = URL.createObjectURL(image);
        setImageURL(url);
        setImageLoadedTimestamp(Date.now());
      } catch {
        setImageError('Image could not be downloaded');
      }
    }
    fetchFromCamera();
  }, [setImageError, setImageURL, setImageLoadedTimestamp]);

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
        <img
          className={classes.image}
          alt="Patient's Preview"
          src={imageURL}
        />
      ) : null}
      {imageLoadedTimestamp ? (
        <Typography>{`Image loaded at: ${new Date(imageLoadedTimestamp).toISOString()}`}</Typography>
      ) : null}
      {imageError ? <Typography color="error">{imageError}</Typography> : null}
      <Button color="primary" variant="contained" onClick={onDownload}>
        Download Image
      </Button>
    </div>
  );
};

export default CameraViewer;
