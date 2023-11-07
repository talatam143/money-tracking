import React, { useEffect } from 'react';
import { Box, Button } from '@mui/material';
import { Outlet } from 'react-router-dom';
import UserProfileCard from './UserProfileCard';
import UserDetails from './UserDetails';
import { setUserLogout } from '../../features/User/UserSlice';
import { useDispatch, useSelector } from 'react-redux';
import { setSuccessState, statesEnum } from '../../features/PageState/PageState';
import SkeletonLoader from '../Loader/Skeleton';
import { getUserDetails } from '../../Services/User/UserDetails';
import { setUserData } from '../../features/User/UserData';
import { formatpaymentInformation } from '../Utils/formatData';

const Account = () => {
  const dispatch = useDispatch();
  const pageState = useSelector((state) => state.pageState);
  const userData = useSelector((state) => state.userData);

  useEffect(() => {
    if (!userData.isUserDatafetced) {
      fetchUserDetails();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userData]);

  const fetchUserDetails = async () => {
    const apiData = await getUserDetails();
    if (apiData.status === 200) {
      var data = formatpaymentInformation(apiData.data);
      dispatch(setUserData(data));
      dispatch(setSuccessState());
    }
  };

  const Page = () => {
    switch (pageState.state) {
      case statesEnum.LOADING:
        return <SkeletonLoader pageType='ACCOUNT' />;

      case statesEnum.SUCCESS:
        return (
          <>
            <Box
              sx={{
                width: '100vw',
                overflowX: 'hidden',
                height: '90vh',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <Box>
                <UserProfileCard />
                <UserDetails />
              </Box>
              <Button
                onClick={() => dispatch(setUserLogout())}
                variant='contained'
                sx={{
                  alignSelf: 'center',
                  width: '95%',
                  background: '#eb455f',
                  color: '#fcffe7',
                  fontWeight: 600,
                  fontSize: '18px',
                  '&:active': {
                    background: '#eb455f',
                    color: '#fcffe7',
                  },
                  '&:hover': {
                    background: '#eb455f',
                    opacity: '80%',
                  },
                }}
              >
                Logout
              </Button>
            </Box>
            <Outlet />
          </>
        );

      default:
        break;
    }
  };

  return <Page />;
};

export default Account;
