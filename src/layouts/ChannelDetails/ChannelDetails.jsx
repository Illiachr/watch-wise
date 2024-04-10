import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box } from '@mui/material';
import { ChannelCard, Videos } from '../../components';

import channelDetails from '../../test/mock/channelDetails.json';
import channelVideos from '../../test/mock/channelVideos.json';
import youtubeAPI from '../../utils/api/YoutubeAPIv3';

// const channelDataDefaults = channelDetails;
const channelVideosDefaults = { items: [] };
// const channelVideosDefaults = channelVideos;

const ChannelDetails = () => {
  const { id } = useParams();
  // const [channelDetails, setChannelDetails] = useState(channelDetails.items[0]);
  const [channelDetails, setChannelDetails] = useState({});
  const [channelVideos, setChannelVideos] = useState(channelVideosDefaults);
  const [detailsLoading, setDetailsLoading] = useState(false);
  const [videosLoading, setVideosLoading] = useState(false);
  const [reqDetailsError, setReqDetailsError] = useState('');
  const [reqVideosError, setReqVideosError] = useState('');

  useEffect(() => {
    let ignore = false;

    const getDetails = async () => {
      if (ignore) return;
      try {
        setDetailsLoading(true);
        const data = await youtubeAPI.getChannelDetails(id);
        console.log({data});
        setChannelDetails(data);
      } catch (err) {
        setReqDetailsError(err.message);
      } finally {
        setDetailsLoading(false);
      }
    };

    const getVideos = async () => {
      if (ignore) return;
      try {
        setVideosLoading(true);
        const data = await youtubeAPI.getChannelVideos(id);
        console.log({data});
        setChannelVideos(data);
      } catch (err) {
        setReqVideosError(err.message);
      } finally {
        setVideosLoading(false);
      }
    };

    getDetails();
    getVideos();

    return () => {
      ignore = true;
    };
  }, [id]);

  return (
    <Box
      minHeight='95vh'
    >
      <Box>
        <div
          style={{
            height: '300px',
            background: 'linear-gradient(90deg, rgba(0,238,247,1) 0%, rgba(206,3,184,1) 100%, rgba(0,212,255,1) 100%)',
            zIndex: 10
          }}
        />
        {detailsLoading && <span>Loading ...</span>}
        {reqDetailsError && <span>{reqDetailsError}</span>}
        {Object.keys(channelDetails).length > 0 && (
          <ChannelCard
            channelDetails={channelDetails}
            marginTop='-110px'
          />
          )}
      </Box>
      <Box
        display='flex'
        p={2}
      >
        <Box
          sx={{
            mr: { sm: '100px' }
          }}
        />
        {videosLoading && <span>Loading ...</span>}
        {reqVideosError && <span>{reqVideosError}</span>}
        {channelVideos?.items?.length > 0 && (
          <Videos videos={channelVideos.items} />
        )}
      </Box>
    </Box>
  );
};

export default ChannelDetails;