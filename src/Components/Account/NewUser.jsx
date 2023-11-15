import { Box, Button, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { startSnackbar } from '../../features/SnackBar/SnackBar';
import { useDispatch, useSelector } from 'react-redux';
import FreeSoloAutoCompleteBox from '../MuiComponents/AutoComplete';

import './NewUserStyles.css';
import brandLogo from '../../Assets/Images/transaction_128.png';
import { userPaymentDataHandler } from '../../Services/User/PaymentData';
import { resetLoader } from '../../features/ProgressLoader/ProgressLoader';
import { paymentMetaData } from '../Utils/paymentsFormat';

const keys = Object.keys(paymentMetaData);
var initialState = {};
keys.forEach((eachPayment) => {
  initialState[eachPayment] = [];
});

const NewUser = () => {
  const [paymentDetails, setPaymentDetails] = useState(initialState);
  const appColorTheme = useSelector((state) => state.colorState);
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
      paymentDetails[keys[0]].length > 0 ||
      paymentDetails[keys[1]].length > 0 ||
      paymentDetails[keys[2]].length > 0
    ) {
      const response = await userPaymentDataHandler(
        'updatePaymentDetails',
        paymentDetails,
        '/updatealldetails',
        'PUT',
      );
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
      <Typography sx={{ fontSize: '22px', fontWeight: '600', color: appColorTheme.primaryColor }}>
        Add payment details
      </Typography>
      <form className='newPaymentsFormContainer' onSubmit={handlePaymentsSubmit}>
        {keys.map((eachPayment) => (
          <FreeSoloAutoCompleteBox
            key={eachPayment}
            data={paymentMetaData[eachPayment].data}
            id={eachPayment}
            label={paymentMetaData[eachPayment].inputLabel}
            value={paymentDetails[eachPayment]}
            handleChange={handleChange}
          />
        ))}
        <Box className='newPaymentsDetailsButtonsContainer'>
          <Button
            variant='outlined'
            color='warning'
            sx={{ width: '49%', fontSize: '16px', fontWeight: '500' }}
            onClick={() => {
              naviagte('/');
              localStorage.removeItem('isNewUser');
            }}
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
