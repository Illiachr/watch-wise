import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Box } from '@mui/material';
import {
  Feed,
  Navbar,
  VideoDetails,
  ChannelDetails,
  SearchFeed,
} from './components/index.js';

const App = () => {
  return (
    <BrowserRouter>
      <Box sx={{ backgroundColor: '#000000' }}>
        <Navbar />
        <Routes>
          <Route path='/' exact element={<Feed />}/>
          <Route path='/videos/:id' exact element={<VideoDetails />}/>
          <Route path='/channels/:id' exact element={<ChannelDetails />}/>
          <Route path='/search/searchTerm' exact element={<SearchFeed />}/>
        </Routes>
      </Box>
    </BrowserRouter>
  );
};

export default App;
