import { Box, Button, Menu, MenuItem, Stack, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';

import './Home.css';

import userIcon from '../../Assets/Images/userIcon/user_64.png';
import { authenticateUser } from '../../Services/Auth/Authentication';

const menuList = ['Profle', 'My account', 'Logout'];

const Home = () => {
  const [menuState, setMenuState] = useState(null);
  const token = localStorage.getItem('userId');
  const userName = localStorage.getItem('userName');
  const navigate = useNavigate();
  const open = Boolean(menuState);
  const handleMenuClick = (event) => {
    setMenuState(event.currentTarget);
  };

  const handleMenuClose = (item) => {
    if (item === 'Logout') {
      localStorage.clear();
      navigate('/login');
    }
    setMenuState(null);
  };

  useEffect(() => {
    if (token) {
      fetchAuth();
    } else {
      navigate('/login');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const fetchAuth = async () => {
    let res = await authenticateUser();
    if (res.status === 200) {
    } else {
      navigate('/login');
    }
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
          Hello {userName ? userName.split(' ')[0] : null}
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
