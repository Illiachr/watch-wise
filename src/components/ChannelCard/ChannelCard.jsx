import { PropTypes } from 'prop-types';
import { Link } from 'react-router-dom';
import { Box, Typography, CardContent, CardMedia } from '@mui/material';
import { CheckCircle } from '@mui/icons-material';

import {
  demoProfilePicture,
  demoChannelUrl,
  demoChannelTitle
} from '../../utils/constants';

import cl from './ChannelCard.module.css';

const ChannelCard = ({
  channelDetails: { id, snippet, statistics },
  marginTop
}) => {
  return (
    <Box
      sx={{
        boxShadow: 'none',
        borderRadius: '20px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: { xs: '356px', md: '320px' },
        height: '326px',
        margin: 'auto',
        marginTop
      }}
    >
      <Link to={id ? `/channel/${id}` : demoChannelUrl}>
          <CardContent
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              textAlign: 'center',
              color: '#ffffff'
            }}
          >
            <CardMedia
              image={snippet?.thumbnails?.high?.url || demoProfilePicture}
              alt={snippet?.title || demoChannelTitle}
              sx={{
                width: 180,
                height: 180,
                mb: 2,
                border: '1px solid #e3e3e3',
                borderRadius: '50%',
              }}
            />
            <Typography variant='h6'>
              {snippet?.title || demoChannelTitle}
              <CheckCircle
                sx={{
                  fontSize: 14,
                  color: '#808080',
                  ml: '5px'
                }}
              />
            </Typography>
            {statistics?.subscriberCount && (
              <Typography>
                {parseInt(statistics?.subscriberCount).toLocaleString()} Subscribers
                </Typography>
            )}
          </CardContent>
        </Link>
    </Box>
  );
};

ChannelCard.propTypes = {
  channelDetails: PropTypes.object,
  marginTop: PropTypes.string
};

export default ChannelCard;