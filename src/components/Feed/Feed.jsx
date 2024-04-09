import { useState, useEffect } from 'react';
import { Stack, Box, Typography } from '@mui/material';
import { Sidebar, Videos } from '../index.js';
import { clNames, defaultCategory } from '../../utils/constants.jsx';
import { fetchFromAPI } from '../../utils/fetchFromAPI.js';

import cl from './Feed.module.css';

import { mockJsMasteryResponse } from '../../test/mock/mockJsMasteryResponse.js';

const Feed = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [reqError, setReqError] = useState(null);
  // const [data, setData] = useState({items: []});
  const [data, setData] = useState(mockJsMasteryResponse);
  const [selectedCategory, setSelectedCategory] = useState(defaultCategory);

  // useEffect(() => {
  //   const getData = async () => {
  //     const params = {
  //       q: selectedCategory,
  //       part: 'id,snippet',
  //       maxResults: 50
  //     };

  //     setIsLoading(true);
  //     setReqError(null);

  //     try {
  //       const data = await fetchFromAPI('search', params);
  //       console.log({data});
  //       setIsLoading(false);
  //       setData(data);
  //     } catch (error) {
  //       setReqError(error.message);
  //       console.error(error);
  //     }
  //   };

  //   getData();
  // }, [selectedCategory]);

  const handleCategory = (e) => {
    const { target } = e;
    const btn = target.closest('button');
    if (!btn) return;
    setSelectedCategory(btn.value);
  };

  return (
    <Stack
      sx={{
        flexDirection: {
          sx: 'column',
          md: 'row'
        }
      }}
    >
      <Box
        sx={{
          height: {
            sx: 'auto',
            md: '92vh'
          },
          borderRight: '2px solid #3d3d3d',
          px: { sx: 0, md: 2 }
        }}
      >
        <Sidebar selectedCategory={selectedCategory} onSelect={handleCategory} />
        <Typography
          className={cl[clNames.copyright]}
          variant='body2'
          sx={{
            mt: 1.5,
            color: '#ffffff',
          }}
        >
          &copy;&nbsp;Copyright IC Media 2024
        </Typography>
      </Box>
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
          {selectedCategory}&nbsp;
          <span className={cl[clNames.feedSubtitle]}>videos</span>
        </Typography>
        <Typography
          variant='h4'
          fontWeight='bold'
          mb={2}
        >
          {isLoading && <span>Loading ...</span>}
          {isLoading && <span>{reqError}</span>}
          {data.items.length === 0 && <span>No videos found</span>}
        </Typography>
        {data.items.length > 0 && <Videos videos={data.items} />}
      </Box>
    </Stack>
  );
};

export default Feed;