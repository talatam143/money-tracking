import React, { useState } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Menu,
  MenuItem,
  Paper,
  Stack,
  Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

import './Home.css';

import userIcon from '../../Assets/Images/userIcon/user_64.png';
import { useDispatch, useSelector } from 'react-redux';
import { setUserLogout } from '../../features/User/UserSlice';
import { CloseIcon } from '../../Assets/Icons/Icons';
import {
  blueTheme,
  defaultTheme,
  greenTheme,
  greyTheme,
  secondaryTheme,
  darkTheme,
} from '../../features/ColoeTheme/ColorTheme';

const menuList = ['Theme', 'My account', 'Logout'];
const themesList = [
  {
    name: 'Default theme',
    value: 'defaultTheme',
    dispatchFunc: defaultTheme(),
    colors: ['#fcffe7', '#eb455f', '#2b3467', '#bad7e9'],
  },
  {
    name: 'Secondary theme',
    value: 'secondaryTheme',
    dispatchFunc: secondaryTheme(),
    colors: ['#F5F5F5', '#FC5185', '#364F6B', '#3FC1C9'],
  },
  {
    name: 'Blue theme',
    value: 'blueTheme',
    dispatchFunc: blueTheme(),
    colors: ['#F7FBFC', '#0F4C75', '#1B262C', '#3282B8'],
  },
  {
    name: 'Green theme',
    value: 'greenTheme',
    dispatchFunc: greenTheme(),
    colors: ['#FEFFDE', '#52734D', '#40513B', '#DDFFBC'],
  },
  {
    name: 'Grey theme',
    value: 'greyTheme',
    dispatchFunc: greyTheme(),
    colors: ['#FAF3E0', '#6C3428', '#1E212D', '#F0E9D2'],
  },
  {
    name: 'Dark theme',
    value: 'darkTheme',
    dispatchFunc: darkTheme(),
    colors: ['#111936', '#1e88e5', '#651fff', '#d1c4e9'],
  },
];

const Home = () => {
  const [menuState, setMenuState] = useState(null);
  const user = useSelector((state) => state.user);
  const appColorTheme = useSelector((state) => state.colorState);
  const [themeDialog, setThemeDialog] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState(appColorTheme.name);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const open = Boolean(menuState);

  const handleMenuClick = (event) => {
    setMenuState(event.currentTarget);
  };

  const handleMenuClose = (item) => {
    switch (item) {
      case 'Logout':
        dispatch(setUserLogout());
        break;
      case 'My account':
        navigate('/account');
        break;
      case 'Theme':
        setThemeDialog(true);
        break;
      default:
        break;
    }

    setMenuState(null);
  };

  const handleDialogClose = () => {
    setThemeDialog(false);
  };

  const submitChangeTheme = () => {
    let filteredTheme = themesList.filter((theme) => theme.name === selectedTheme);
    document.body.className = filteredTheme[0].value;
    dispatch(filteredTheme[0].dispatchFunc);
    handleDialogClose();
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
          color={appColorTheme.secondaryColor}
          className='brandTitleHeading'
        >
          Hello {user?.name ? user?.name?.split(' ')[0] : null}
        </Typography>
        <Button
          onClick={handleMenuClick}
          sx={{
            backgroundColor: appColorTheme.secondaryColor,
            backgroundImage: `url(${userIcon})`,
            backgroundSize: '55px',
            backgroundRepeat: 'no-repeat',
            height: '56px',
            borderRadius: '100px',
            minWidth: '54px',
            boxShadow: 'rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px',
            '&:hover': {
              backgroundColor: appColorTheme.secondaryColor,
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
              background: appColorTheme.lightColor,
              borderRadius: 2,
              color: appColorTheme.secondaryColor,
            },
          }}
        >
          {menuList?.map((eachMenu) => (
            <MenuItem
              onClick={() => handleMenuClose(eachMenu)}
              sx={{
                fontSize: '20px',
                fontWeight: '600',
                minHeight: '5px',
                background: 'reds',
                padding: '6px 20px',
              }}
              key={eachMenu}
            >
              {eachMenu}
            </MenuItem>
          ))}
        </Menu>
      </Stack>
      <Dialog open={themeDialog} keepMounted aria-describedby='alert-dialog-slide-description'>
        <DialogTitle
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            cursor: 'pointer',
          }}
        >
          Change Them
          <button
            onClick={handleDialogClose}
            style={{ background: 'none', border: 'none', cursor: 'pointer' }}
          >
            <CloseIcon />
          </button>
        </DialogTitle>

        <DialogContent>
          {themesList.map((theme) => (
            <Paper
              elevation={4}
              sx={{
                borderRadius: '6px',
                background: appColorTheme.lightColor,
                boxSizing: 'border-box',
              }}
              key={theme.name}
            >
              <label
                className='changeThemeLabel'
                style={{
                  border:
                    selectedTheme === theme.name ? `solid 2px ${appColorTheme.primaryColor}` : null,
                }}
              >
                <input
                  type='radio'
                  name='theme'
                  value={theme.name}
                  checked={selectedTheme === theme.name}
                  onChange={(e) => setSelectedTheme(e.target.value)}
                />
                <div style={{ margin: '5px 0' }}>
                  <p className='themeColorNamePara' style={{ color: theme.colors[1] }}>
                    {theme.name}
                  </p>
                  <div className='themeColorContainer'>
                    {theme.colors.map((eachColor) => (
                      <div
                        className='themeColorSubContainer'
                        key={eachColor}
                        style={{ background: eachColor }}
                      ></div>
                    ))}
                  </div>
                </div>
              </label>
            </Paper>
          ))}
        </DialogContent>
        <DialogActions>
          <Button
            size='small'
            sx={{
              margin: 'auto',
              background: appColorTheme.primaryColor,
              color: appColorTheme.backgroundColor,
              fontWeight: 600,
              fontSize: '15px',
              '&:active': {
                background: appColorTheme.primaryColor,
                color: appColorTheme.backgroundColor,
              },
              '&:hover': {
                background: appColorTheme.primaryColor,
                opacity: '80%',
              },
            }}
            onClick={submitChangeTheme}
          >
            Change
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Home;
