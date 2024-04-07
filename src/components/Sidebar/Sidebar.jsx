import { PropTypes } from 'prop-types';
import { Stack } from '@mui/material';
import { categories, clNames } from '../../utils/constants.jsx';

import cl from './Sidebar.module.css';

const Sidebar = ({ selectedCategory, onSelect }) => {
  return (
    <Stack
      direction='row'
      sx={{
        overflowY: 'auto',
        height: { sx: 'auto', md: '95%' },
        flexDirection: { md: 'column' }
      }}
    >
      {categories.map(({name, icon}, i) => {
        const btnCls = name === selectedCategory ?
          [cl[clNames.categoryBtn], cl[clNames.selected]]:
          [cl[clNames.categoryBtn]];
        return (
          <button
            className={btnCls.join(' ')}
            type='button'
            key={i}
            value={name}
            onClick={onSelect}
          >
            <span className={cl[clNames.categoryIcon]}>{icon}</span>
            <span className={cl[clNames.categoryName]}>{name}</span>
          </button>
        );}
      )}
    </Stack>
  );
};

Sidebar.propTypes = {
  selectedCategory: PropTypes.string,
  onSelect: PropTypes.func
};

export default Sidebar;