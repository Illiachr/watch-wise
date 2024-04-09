import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box } from '@mui/material';
import { ChannelCard, Videos } from '../../components';
import { useFetch } from '../../utils/hooks/useFetch';
import { fetchFromAPI } from '../../utils/fetchFromAPI';

import channelDetails from '../../test/mock/channelDetails.json';
import channelVideos from '../../test/mock/channelVideos.json';

const channelDataDefaults = channelDetails;
// const channelVideosDefaults = { items: [] };
const channelVideosDefaults = channelVideos;

const ChannelDetails = () => {
  const { id } = useParams();
  const [channelData, setChannelData] = useState(channelDetails.items[0]);
  // const [channelData, setChannelData] = useState({});
  const [channelVideosData, setChannelVideosData] = useState(channelVideosDefaults);

  const [fetchChannelDetails,
    channelDetailsLoading,
    fetchChannelDetailsError
  ] = useFetch(async () => {
    const params = {
      id,
      part: 'snippet,statistics'
    };
    const data = await fetchFromAPI('channels', params);
    console.log({data});
    setChannelData(data.items[0]);
  });

  const [fetchChannelVideos,
    channelVideosLoading,
    fetchChannelVideosError
  ] = useFetch(async () => {
    const params = {
      channelId: id,
      part: 'snippet,id'
    };
    const data = await fetchFromAPI('search', params);
    console.log({data});
    setChannelVideosData(data);
  });

  // useEffect(() => {
  //   fetchChannelDetails();
  //   fetchChannelVideos();
  // }, [id]);

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
        {channelDetailsLoading && <span>Loading ...</span>}
        {fetchChannelDetailsError && <span>{fetchChannelDetailsError}</span>}
        {Object.keys(channelData).length > 0 && (
          <ChannelCard
            channelDetails={channelData}
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
        {channelVideosLoading && <span>Loading ...</span>}
        {fetchChannelVideosError && <span>{fetchChannelDetailsError}</span>}
        {channelVideosData?.items?.length > 0 && (
          <Videos videos={channelVideosData.items} />
        )}
      </Box>
    </Box>
  );
};

export default ChannelDetails;