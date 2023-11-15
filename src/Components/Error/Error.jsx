import { Button, Stack, Typography } from '@mui/material';
import errorImage from '../../Assets/Images/error.png';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';


const Error = () => {
  const naviagte = useNavigate();
  const appColorTheme = useSelector((state) => state.colorState);
  
  return (
    <Stack flexDirection='column' alignItems='center' sx={{ height: '100vh', pt: 10 }}>
      <img src={errorImage} alt='error-logo' width='250px' />
      <Typography
        sx={{
          textAlign: 'center',
          fontWeight: 500,
          fontSize: '22px',
          color: appColorTheme.secondaryColor,
          p: '0 15px',
          lineHeight: 1.2,
          mt: 1,
        }}
      >
        We apologize for the inconvenience. It seems that there was an issue on our website.
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
        Go Home
      </Button>
    </Stack>
  );
};

export default Error;
