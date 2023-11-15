import React from 'react';
import image404 from '../../Assets/Images/404.png';
import { Button, Stack, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const NotFound = () => {
  const naviagte = useNavigate();
  const appColorTheme = useSelector((state) => state.colorState);

  return (
    <Stack flexDirection='column' alignItems='center' sx={{ height: '100vh' }}>
      <img src={image404} alt='error-logo' width='250px' />
      <Typography
        sx={{
          textAlign: 'center',
          fontWeight: 600,
          fontSize: '24px',
          color: appColorTheme.secondaryColor,
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
          background: appColorTheme.secondaryColor,
          color: appColorTheme.backgroundColor,
          fontWeight: 500,
          fontSize: '16px',
          mt: 3,
          '&:active': {
            background: appColorTheme.secondaryColor,
            color: appColorTheme.backgroundColor,
          },
          '&:hover': {
            background: appColorTheme.secondaryColor,
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
