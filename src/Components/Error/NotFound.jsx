import { Box } from '@mui/material';
import errorImage from '../../Assets/Images/error.png';
import React from 'react';

const NotFound = () => {
  return (
    <Box>
      <p>Something went wrong</p>
      <img src={errorImage} alt='error-logo' width='300px' />
    </Box>
  );
};

export default NotFound;
