import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Box } from '@mui/material';
import {
  Feed,
  Navbar,
  VideoDetails,
  SearchFeed,
} from './components/index.js';
import ChannelDetails from './layouts/ChannelDetails/ChannelDetails.jsx';

const App = () => {
  return (
    <BrowserRouter>
      <Box sx={{ backgroundColor: '#000000' }}>
        <Navbar />
        <Routes>
          <Route path='/' exact element={<Feed />}/>
          <Route path='/video/:id' exact element={<VideoDetails />}/>
          <Route path='/channel/:id' exact element={<ChannelDetails />}/>
          <Route path='/search/:searchTerm' exact element={<SearchFeed />}/>
        </Routes>
      </Box>
    </BrowserRouter>
  );
};

export default App;
