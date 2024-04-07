import { useState, useEffect } from 'react';
import { Stack, Box, Typography } from '@mui/material';
import { Sidebar } from '../index.js';
import { clNames, defaultCategory } from '../../utils/constants.jsx';

import cl from './Feed.module.css';

const Feed = () => {
  const [selectedCategory, setSelectedCategory] = useState(defaultCategory);

  useEffect(() => {}, [selectedCategory]);

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
      </Box>
    </Stack>
  );
};

export default Feed;