import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import ReactPlayer from 'react-player';
import { Box, Stack, Typography} from '@mui/material';
import { CheckCircle } from '@mui/icons-material';
import youtubeAPI from '../../utils/api/YoutubeAPIv3';
import { Videos } from '../';

import cl from './VideoDetails.module.css';

const VideoDetails = () => {
  const { id } = useParams();
  const [loading, setIsLoading] = useState(true);
  const [reqError, setReqError] = useState('');
  const [videoDetails, setVideoDetails] = useState(null);
  const [suggestedVideos, setSuggestedVideos] = useState([]);

  useEffect(() => {
    let ignore = false;
    const getData = async () => {
      if (ignore) return;

      setIsLoading(true);

      try {
        const videoDetailsData = await youtubeAPI.getVideoDetails(id);
        const suggestedVideosData = await youtubeAPI.getSuggestedVideos(id);
        setVideoDetails(videoDetailsData);
        setSuggestedVideos(suggestedVideosData.items);
      } catch (error) {
        setReqError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    getData();

    return () => {
      ignore = true;
    };
  }, [id]);

  if (loading) {
    return <span>Loading ...</span>;
  }

  if (reqError.length > 0) {
    return <span>{reqError}</span>;
  }

  const {
    snippet: {
      title,
      channelId,
      channelTitle
    },
    statistics: {
      viewCount,
      likeCount,
      favoriteCount,
      commentCount,
    }
  } = videoDetails;

  return (
    <Box minHeight='95vh'>
      {videoDetails && (
        <Stack
          direction={{
            xs: 'column',
            md: 'row'
          }}
        >
          <Box flex={1}>
            <Box
              sx={{
                width: '100%',
                position: 'sticky',
                top: '86px'
              }}
            >
              <ReactPlayer
                className={cl.react__player}
                url={`http://www.youtube.com/watch?v=${id}`}
                controls
              />
              <Typography
                color='#ffffff'
                variant='h5'
                fontWeight='bold'
                p={2}
              >
                {title}
              </Typography>
              <Stack
                direction='row'
                justifyContent='space-between'
                sx={{color: '#ffffff'}}
                py={1}
                px={2}
              >
                <Link to={`/channel/${channelId}`}>
                  <Typography
                    color='#ffffff'
                    variant='subtitle1'
                  >
                    {channelTitle}
                    <CheckCircle
                      sx={{
                        fontSize: '12px',
                        color: '#808080',
                        ml: '5px'
                      }}
                    />
                  </Typography>
                </Link>
                <Stack
                  direction='row'
                  gap='20px'
                  alignItems='center'
                >
                  <Typography
                    variant='body1'
                    sx={{opacity: 0.7}}
                  >
                    {parseInt(viewCount).toLocaleString()} views
                  </Typography>
                  <Typography
                    variant='body1'
                    sx={{opacity: 0.7}}
                  >
                    {parseInt(likeCount).toLocaleString()} likes
                  </Typography>
                </Stack>
              </Stack>
            </Box>
          </Box>
          {suggestedVideos.length > 0 && (
        <Box
          px={2}
          py={{md: 1, sx: 5}}
          justifyContent='center'
          alignItems='center'
        >
          <Videos videos={suggestedVideos} direction='column'/>
        </Box>
      )}
        </Stack>
      )}
    </Box>
  );
};

export default VideoDetails;