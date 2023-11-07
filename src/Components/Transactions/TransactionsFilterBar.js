import React, { useEffect, useRef, useState } from 'react';
import { Box, Button, FormControl, MenuItem, Select } from '@mui/material';

import './Transactions.css';
import { CloseIcon, DownDirection, SearchIcon } from '../../Assets/Icons/Icons';

const TransactionsFilterBar = () => {
  const [searchBar, setSearchBar] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const [sortOption, setSortOption] = React.useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    if (searchBar && inputRef.current) {
      inputRef.current.focus();
    }
  }, [searchBar]);

  const handleSortChange = (event) => {
    setSortOption(event.target.value);
  };

  const handleSearchButton = (e) => {
    if (searchBar) {
      setSearchBar(false);
      setSearchInput('');
    } else {
      setSearchBar(true);
    }
  };
  return (
    <Box className='transactionsFilterContainer'>
      <input
        ref={inputRef}
        value={searchInput}
        className={searchBar ? 'transactionShowInput' : 'transactionHideInput'}
        onChange={(e) => setSearchInput(e.target.value)}
      />
      <Button
        variant='contained'
        className='transactionSearchButton'
        onClick={handleSearchButton}
        sx={{ borderRadius: searchBar ? '0px 6px 6px 0px' : '6px' }}
      >
        {searchBar ? <CloseIcon /> : <SearchIcon />}
      </Button>
      <Box
        className={
          searchBar ? 'transactionsHideChildFilterContainer' : 'transactionsChildFilterContainer'
        }
      >
        <FormControl sx={{ m: 1, minWidth: 120 }} size='small'>
          <Select
            value={sortOption}
            onChange={handleSortChange}
            displayEmpty
            inputProps={{ 'aria-label': 'Without label' }}
            sx={{
              background: '#fcffe7',
              color: '#2b3467',
              fontWeight: 600,
              height: '40px',
              width: '190px',
            }}
          >
            <MenuItem value=''>
              <em>Sort Options</em>
            </MenuItem>
            <MenuItem value='Latest tarnsactions'>Latest tarnsactions</MenuItem>
            <MenuItem value='Old transactions'>Old transactions</MenuItem>
            <MenuItem value='High to Low'>High to Low</MenuItem>
            <MenuItem value='Low to High'>Low to High</MenuItem>
            <MenuItem value='Starred'>Starred</MenuItem>
          </Select>
        </FormControl>

        <Button
          variant='contained'
          className='transactionSearchButton'
          sx={{ borderRadius: searchBar ? '0px 6px 6px 0px' : '6px' }}
        >
          <DownDirection />
        </Button>
      </Box>
    </Box>
  );
};

export default TransactionsFilterBar;
