import { Box, Button, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { startSnackbar } from '../../features/SnackBar/SnackBar';
import { useDispatch } from 'react-redux';
import FreeSoloAutoCompleteBox from '../MuiComponents/AutoComplete';

import './NewUserStyles.css';
import { bankData, cardsData, upiData } from '../Constant Data/Data';
import brandLogo from '../../Assets/Images/transaction_128.png';
import { updatePaymentDetails } from '../../Services/User/UserDetails';
import { resetLoader } from '../../features/ProgressLoader/ProgressLoader';

const initialState = {
  bankDetails: [],
  creditCardsDetails: [],
  upiDetails: [],
};

const NewUser = () => {
  const [paymentDetails, setPaymentDetails] = useState(initialState);
  const naviagte = useNavigate();
  const dispatch = useDispatch();
  const token = localStorage.getItem('userId');
  const isNewUser = localStorage.getItem('isNewUser');

  useEffect(() => {
    if (token && isNewUser && isNewUser === 'true') {
    } else {
      naviagte('/');
    }
  }, [token, isNewUser, naviagte]);

  const handlePaymentsSubmit = async (e) => {
    e.preventDefault();
    if (
      paymentDetails.bankDetails.length > 0 ||
      paymentDetails.creditCardsDetails.length > 0 ||
      paymentDetails.upiDetails.length > 0
    ) {
      const response = await updatePaymentDetails(paymentDetails);
      if (response.status === 200) {
        dispatch(startSnackbar({ message: response.data.message, severity: 'success' }));
        dispatch(resetLoader());
        setPaymentDetails(initialState);
        localStorage.removeItem('isNewUser');
        naviagte('/');
      } else {
        dispatch(startSnackbar({ message: response.data.errorMessage, severity: 'error' }));
        dispatch(resetLoader());
      }
    } else {
      dispatch(
        startSnackbar({
          message:
            'Please make sure to fill in at least one field. If you prefer, you can skip this for now and update it later.',
          severity: 'error',
        }),
      );
    }
  };

  const handleChange = (event, newValue, id) => {
    setPaymentDetails((prevErrorData) => ({ ...prevErrorData, [id]: newValue }));
  };

  return (
    <Box className='newPaymentsDetailsContainer'>
      <img src={brandLogo} alt='brand-logo' className='loginFormSignupForm' />
      <Typography sx={{ fontSize: '22px', fontWeight: '600', color: '#eb455f' }}>
        Add payment details
      </Typography>
      <form className='newPaymentsFormContainer' onSubmit={handlePaymentsSubmit}>
        <FreeSoloAutoCompleteBox
          data={bankData}
          id='bankDetails'
          label='Select Bank'
          value={paymentDetails.bankDetails}
          handleChange={handleChange}
        />
        <FreeSoloAutoCompleteBox
          data={cardsData}
          id='creditCardsDetails'
          label='Credit Cards'
          value={paymentDetails.creditCardsDetails}
          handleChange={handleChange}
        />
        <FreeSoloAutoCompleteBox
          data={upiData}
          id='upiDetails'
          label='Add UPI'
          value={paymentDetails.upiDetails}
          handleChange={handleChange}
        />
        <Box className='newPaymentsDetailsButtonsContainer'>
          <Button
            variant='outlined'
            color='warning'
            sx={{ width: '49%', fontSize: '16px', fontWeight: '500' }}
            onClick={() => naviagte('/')}
          >
            Skip
          </Button>
          <Button
            variant='contained'
            color='success'
            sx={{ width: '49%', fontSize: '16px', fontWeight: '500' }}
            type='submit'
          >
            Submit
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default NewUser;
