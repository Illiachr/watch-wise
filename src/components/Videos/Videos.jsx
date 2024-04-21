import { PropTypes } from 'prop-types';
import { Stack, Box } from '@mui/material';
import { clNames } from '../../utils/constants.jsx';
import { ChannelCard, VideoCard } from '../index.js';

import cl from './Videos.module.css';

const DEFAULT_DIRECTION = 'row';

const Videos = ({videos, direction}) => {
  return (
    <Stack
      direction={direction || DEFAULT_DIRECTION}
      flexWrap='wrap'
      justifyContent='start'
      gap={2}
    >
      {videos.map((item, i)=> {
      return (
        <Box key={i}>
          {item.id.videoId && <VideoCard videoDetails={item} />}
          {item.id.channelId && <ChannelCard channelDetails={item} />}
        </Box>
      );
    })}
    </Stack>
  );
};

Videos.propTypes = {
  direction: PropTypes.string,
  videos: PropTypes.arrayOf(PropTypes.shape({
    kind: PropTypes.string,
    id: PropTypes.shape({
      kind: PropTypes.string,
      videoId: PropTypes.string,
    }),
    snippet: PropTypes.shape({
      publishedAt: PropTypes.string,
      channelId: PropTypes.string,
      title: PropTypes.string.isRequired,
      description: PropTypes.string,
      thumbnails: PropTypes.shape({
        default: PropTypes.shape({
          url: PropTypes.string,
          width: PropTypes.number,
          height: PropTypes.number,
        }),
        medium: PropTypes.shape({
          url: PropTypes.string,
          width: PropTypes.number,
          height: PropTypes.number,
        }),
        high: PropTypes.shape({
          url: PropTypes.string,
          width: PropTypes.number,
          height: PropTypes.number,
        }),
      }),
      channelTitle: PropTypes.string,
      liveBroadcastContent: PropTypes.string,
      publishTime: PropTypes.string,
    })
  })).isRequired
};

export default Videos;