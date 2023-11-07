import React, { useState } from 'react';
import { Box, Button, Menu, MenuItem, Stack, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import './Home.css';

import userIcon from '../../Assets/Images/userIcon/user_64.png';
import { useDispatch, useSelector } from 'react-redux';
import { setUserLogout } from '../../features/User/UserSlice';

const menuList = ['Profle', 'My account', 'Logout'];

const Home = () => {
  const [menuState, setMenuState] = useState(null);
  const user = useSelector((state) => state.user);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const open = Boolean(menuState);

  const handleMenuClick = (event) => {
    setMenuState(event.currentTarget);
  };

  const handleMenuClose = (item) => {
    if (item === 'Logout') {
      dispatch(setUserLogout());
    } else if (item === 'My account') {
      navigate('/account');
    }

    setMenuState(null);
  };

  return (
    <Box>
      <Stack
        direction='row'
        sx={{
          padding: '10px 20px',
        }}
        alignItems='center'
        justifyContent='space-between'
      >
        <Typography
          variant='h3'
          fontSize={36}
          fontWeight={800}
          color={'#2b3467'}
          className='brandTitleHeading'
        >
          Hello {user.name ? user.name.split(' ')[0] : null}
        </Typography>
        <Button
          onClick={handleMenuClick}
          sx={{
            backgroundColor: '#2b3467',
            backgroundImage: `url(${userIcon})`,
            backgroundSize: '55px',
            backgroundRepeat: 'no-repeat',
            height: '56px',
            borderRadius: '100px',
            minWidth: '54px',
            boxShadow: 'rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px',
            '&:hover': {
              backgroundColor: '#2b3467',
            },
          }}
        ></Button>
        <Menu
          id='basic-menu'
          anchorEl={menuState}
          open={open}
          onClose={handleMenuClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
          PaperProps={{
            sx: {
              background: '#bad7e9',
              borderRadius: 2,
              color: '#2b3467',
            },
          }}
        >
          {menuList?.map((eachMenu) => (
            <MenuItem
              onClick={() => handleMenuClose(eachMenu)}
              sx={{
                fontSize: '18px',
                fontWeight: '600',
                minHeight: '5px',
              }}
              key={eachMenu}
            >
              {eachMenu}
            </MenuItem>
          ))}
        </Menu>
      </Stack>
    </Box>
  );
};

export default Home;
