import { PropTypes } from 'prop-types';
import { Link } from 'react-router-dom';
import { Typography, Card, CardContent, CardMedia } from '@mui/material';
import { CheckCircle } from '@mui/icons-material';

import {
  demoThumbnailUrl,
  demoVideoUrl,
  demoVideoTitle,
  demoChannelUrl,
  demoChannelTitle,
} from '../../utils/constants';

import cl from './VideoCard.module.css';

const VideoCard = ({
  videoDetails: {
    id: { videoId },
    snippet } }) => {
  return (
    <Card
      sx={{
        width: { sx: '100%', sm: '358px', md: '320px' },
        boxShadow: 'none',
        borderRadius: 0
      }}
    >
      <Link to={videoId ? `/video/${videoId}` : demoVideoUrl}>
        <CardMedia
          image={snippet?.thumbnails?.high?.url || demoThumbnailUrl}
          alt={snippet?.title}
          sx={{
            width: { sx: '100%', sm: '358px', md: '320px' },
            height: 180
          }}
        />
      </Link>
      <CardContent
        sx={{
          backgroundColor: '#1e1e1e',
          height: '106px',
        }}
      >
        <Link to={videoId ? `/video/${videoId}` : demoVideoUrl}>
          <Typography
            variant='subtitle1'
            fontWeight='bold'
            color='#ffffff'
          >
            {snippet?.title.slice(0, 60) || demoVideoTitle.slice(0, 60)}
          </Typography>
        </Link>
        <Link to={snippet.channelId ? `/channel/${snippet.channelId}` : demoChannelUrl}>
          <Typography
            variant='subtitle2'
            fontWeight='bold'
            color='#808080'
          >
            {snippet?.channelTitle || demoChannelTitle}
            <CheckCircle
              sx={{
                fontSize: 12,
                color: '#808080',
                ml: '5px'
              }}
            />
          </Typography>
        </Link>
      </CardContent>
    </Card>
  );
};

VideoCard.propTypes = {
  videoDetails: PropTypes.object
};

export default VideoCard;