import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import { Videos } from '../index.js';
import { clNames } from '../../utils/constants.jsx';
import youtubeAPI from '../../utils/api/YoutubeAPIv3.js';

import cl from './SearchFeed.module.css';

const SearchFeed = () => {
  const [loading, setIsLoading] = useState(false);
  const [reqError, setReqError] = useState('');
  const [data, setData] = useState({items: []});
  const { searchTerm } = useParams();

  useEffect(() => {
    let ignore = false;
    const getData = async () => {
      if (ignore) return;

      setIsLoading(true);

      try {
        const data = await youtubeAPI.getVideosByCategory(searchTerm);
        console.log({data});
        setData(data);
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
  }, [searchTerm]);

  return (
      <Box
        p={2}
        sx={{
          overflowY: 'auto',
          height: '90vh',
          flex: 2
        }}
      >
        <Typography
          variant='h4'
          fontWeight='bold'
          mb={2}
        >
          Search results for:
          <span className={cl[clNames.feedSubtitle]}> {searchTerm} </span>
          videos
        </Typography>
        <Typography
          variant='h4'
          fontWeight='bold'
          mb={2}
        >
          {loading && <span>Loading ...</span>}
          {reqError && <span>{reqError}</span>}
          {data.items.length === 0 && <span>No videos found</span>}
        </Typography>
        {data.items.length > 0 && <Videos videos={data.items} />}
      </Box>
  );
};

export default SearchFeed;