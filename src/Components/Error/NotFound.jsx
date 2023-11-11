import React from 'react';
import image404 from '../../Assets/Images/404.png';
import { Button, Stack, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const naviagte = useNavigate();

  return (
    <Stack flexDirection='column' alignItems='center' sx={{ height: '100vh' }}>
      <img src={image404} alt='error-logo' width='250px' />
      <Typography
        sx={{
          textAlign: 'center',
          fontWeight: 600,
          fontSize: '24px',
          color: '#2b3467',
          p: '0 15px',
        }}
      >
        OOPS! PAGE NOT BE FOUND
      </Typography>
      <Typography
        sx={{
          textAlign: 'center',
          fontWeight: 500,
          fontSize: '20px',
          color: '#000000',
          p: '0 15px',
          lineHeight: 1.2,
          mt: 1,
        }}
      >
        Sorry but the page you are looking for does not exist, have been removed. name changed or is
        temporarily unavailable
      </Typography>
      <Button
        variant='contained'
        sx={{
          alignSelf: 'center',
          background: '#2b3467',
          color: '#fcffe7',
          fontWeight: 500,
          fontSize: '16px',
          mt: 3,
          '&:active': {
            background: '#2b3467',
            color: '#fcffe7',
          },
          '&:hover': {
            background: '#2b3467',
            opacity: '80%',
          },
        }}
        onClick={() => naviagte('/')}
      >
        Back to homepage
      </Button>
    </Stack>
  );
};

export default NotFound;