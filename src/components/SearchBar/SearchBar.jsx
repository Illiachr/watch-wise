import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Paper, IconButton } from '@mui/material';
import { Search } from '@mui/icons-material';

import cl from './SearchBar.module.css';

const SearchBar = () => {
  const [searchValue, setSearchValue] = useState('');
  const navigate = useNavigate();

  const handleSearchValueChange = (e) => {
    const { value } = e.target;
    setSearchValue(value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const {target} = e;
    console.log({target});
    navigate(`/search/${searchValue}`);
  };

  return (
    <Paper
      component='form'
      onSubmit={submitHandler}
      sx={{
        borderRadius: 20,
        border: '1px solid #e3e3e3',
        pl: 2,
        boxShadow: 'none',
        mr: { sm: 5 }
      }}
    >
      <input
        type="text"
        className={cl['search-bar']}
        placeholder='Search ...'
        value={searchValue}
        onChange={handleSearchValueChange}
      />
      <IconButton type="submit"
        sx={{
          p: '10px',
          color: '#ff0000'
        }}
      >
        <Search />
      </IconButton>
    </Paper>
  );
};

export default SearchBar;