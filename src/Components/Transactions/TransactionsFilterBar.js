import React, { useEffect, useRef, useState } from 'react';
import { Box, Button, FormControl, MenuItem, Select } from '@mui/material';

import './Transactions.css';
import { CloseIcon, DownDirection, SearchIcon } from '../../Assets/Icons/Icons';
import { useSelector } from 'react-redux';

const Options = ['Compact', 'Normal'];

const TransactionsFilterBar = (props) => {
  const { viewOptions, handleSortChange } = props;
  const [searchBar, setSearchBar] = useState(false);
  const [searchInput, setSearchInput] = useState('');

  const appColorTheme = useSelector((state) => state.colorState);
  const inputRef = useRef(null);

  useEffect(() => {
    if (searchBar && inputRef.current) {
      inputRef.current.focus();
    }
  }, [searchBar]);

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
            value={viewOptions}
            onChange={handleSortChange}
            displayEmpty
            inputProps={{ 'aria-label': 'Without label' }}
            sx={{
              background: appColorTheme.backgroundColor,
              color: appColorTheme.secondaryColor,
              fontWeight: 600,
              height: '40px',
              width: '120px',
            }}
          >
            <MenuItem value=''>
              <em>none</em>
            </MenuItem>
            {Options.map((eacOption) => (
              <MenuItem value={eacOption} key={eacOption}>
                {eacOption}
              </MenuItem>
            ))}
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
