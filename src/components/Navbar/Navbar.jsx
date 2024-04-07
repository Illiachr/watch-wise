import { Stack } from '@mui/material';
import { Link } from 'react-router-dom';
import { SearchBar } from '../index.js';
import { logo } from '../../utils/constants.jsx';

import cl from './Navbar.module.css';

const Navbar = () => {
  return (
    <Stack
      direction='row'
      alignItems='center'
      p={2}
      sx={{
        postion: 'sticky',
        backgroundColor: '#000000',
        top: 0,
        justifyContent: 'space-between'
      }}
    >
      <Link
        to='/'
        style={{ display: 'flex', alignItems: 'center' }}
      >
        <img src={logo} alt="logo" height={45} />
      </Link>
      <SearchBar />
    </Stack>
  );
};

export default Navbar;