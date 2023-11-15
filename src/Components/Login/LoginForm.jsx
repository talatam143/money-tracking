import React, { useState } from 'react';
import { Box, Button, Grow, Stack, Typography } from '@mui/material';

import './Login.css';
import StyledTextField from '../MuiComponents/InputField';
import { authServiceHandler } from '../../Services/Auth/Authentication';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { resetLoader, startLoader } from '../../features/ProgressLoader/ProgressLoader';
import { startSnackbar } from '../../features/SnackBar/SnackBar';
import { setUserLogin } from '../../features/User/UserSlice';

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const emailErrortext = 'Invalid Email address';
const OTPErrorText = 'OTP must have 6 digits';

const LoginForm = (props) => {
  const { isChecked, handleSignUp } = props;
  const [showPassword, setShowPassword] = useState(true);
  const [showOTP, setShowOTP] = useState(false);
  const [loginData, setLoginData] = useState({ email: '', password: '', OTP: '' });
  const [emailError, setEmailError] = useState(false);
  const [otpError, setOTPError] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const appColorTheme = useSelector((state) => state.colorState);

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    if (!showOTP) {
      if (emailRegex.test(loginData.email)) {
        dispatch(startLoader());
        const response = await authServiceHandler('signIn', loginData, '/login', 'POST');
        if (response.status === 200) {
          dispatch(startSnackbar({ message: response.data.message, severity: 'success' }));
          dispatch(resetLoader());
          dispatch(setUserLogin(response.data));
          localStorage.setItem('userId', response.data.token);
          navigate('/');
        } else {
          if (response.data.isVerified === false) setShowOTP(true);
          dispatch(startSnackbar({ message: response.data.errorMessage, severity: 'error' }));
          dispatch(resetLoader());
        }
      } else {
        setEmailError(true);
      }
    }
  };

  const handleLoginChange = async (e) => {
    const { name, value } = e.target;

    if (name === 'email' && !emailRegex.test(value)) {
      setEmailError(true);
    } else {
      setEmailError(false);
    }
    if (name === 'OTP' && value.length !== 6) {
      setOTPError(true);
    } else {
      setOTPError(false);
    }

    setLoginData((prevLoginData) => ({ ...prevLoginData, [e.target.name]: e.target.value }));
    if (name === 'OTP' && value.length === 6) {
      dispatch(startLoader());
      const response = await authServiceHandler(
        'verifyUser',
        { email: loginData.email, otp: value },
        '/verifyuser',
        'POST',
      );
      if (response.status === 200) {
        dispatch(startSnackbar({ message: response.data.message, severity: 'success' }));
        dispatch(resetLoader());
        localStorage.setItem('userId', response.data.token);
        localStorage.setItem('isNewUser', true);
        dispatch(setUserLogin(response.data));
        navigate('/account/newpayments');
      } else {
        dispatch(startSnackbar({ message: response.data.errorMessage, severity: 'error' }));
        dispatch(resetLoader());
      }
    }
  };

  const handleResendOTP = async () => {
    dispatch(startLoader());
    const response = await authServiceHandler(
      'resendOTP',
      { email: loginData.email },
      '/resendotp',
      'POST',
    );
    if (response.status === 200) {
      dispatch(startSnackbar({ message: response.data.message, severity: 'success' }));
      dispatch(resetLoader());
    } else {
      dispatch(startSnackbar({ message: response.data.errorMessage, severity: 'error' }));
      dispatch(resetLoader());
    }
  };

  return (
    <Grow
      in={isChecked}
      style={{ transformOrigin: 'bottom' }}
      {...(isChecked ? { timeout: 1000 } : {})}
    >
      <Box
        sx={{
          border: 'solid',
          borderWidth: '5px 0 0 0',
          borderColor: appColorTheme.primaryColor,
          borderRadius: '50px 50px 0 0',
        }}
        width='100%'
      >
        <form type='submit' className='loginFormContainer' onSubmit={handleLoginSubmit}>
          <StyledTextField
            name='email'
            label='Email'
            value={loginData.email}
            variant='outlined'
            type='email'
            isRequired={true}
            isAutoFocus={true}
            width={300}
            errorText={emailErrortext}
            error={emailError}
            handleInputChange={handleLoginChange}
          />
          <StyledTextField
            name='password'
            label='Password'
            value={loginData.password}
            variant='outlined'
            type='password'
            isRequired={true}
            isAutoFocus={false}
            width={300}
            handleInputChange={handleLoginChange}
            endAdornmentIcon={{
              type: 'password',
              handleClick: handleClickShowPassword,
              iconStatus: showPassword,
            }}
          />
          <Box width={300} sx={{ textAlign: 'right' }}>
            {showOTP ? (
              <>
                <StyledTextField
                  name='OTP'
                  label='OTP'
                  value={loginData.OTP}
                  variant='outlined'
                  type='number'
                  isAutoFocus={false}
                  width={300}
                  errorText={OTPErrorText}
                  error={otpError}
                  handleInputChange={handleLoginChange}
                />
                <Stack flexDirection='row' justifyContent='space-between' mt={0.5}>
                  <Typography
                    sx={{
                      color: appColorTheme.primaryColor,
                      alignSelf: 'flex-start',
                      fontWeight: 500,
                    }}
                    onClick={handleResendOTP}
                  >
                    Resent OTP
                  </Typography>
                  <a href='/login' className='loginFormAnchorTag'>
                    Forgot Password..?
                  </a>
                </Stack>
              </>
            ) : (
              <a href='/login' className='loginFormAnchorTag'>
                Forgot Password..?
              </a>
            )}
          </Box>
          <Button
            type='submit'
            variant='contained'
            sx={{
              width: '300px',
              background: appColorTheme.primaryColor,
              color: appColorTheme.backgroundColor,
              fontWeight: 500,
              fontSize: 16,
              '&:hover': {
                background: appColorTheme.primaryColor,
                opacity: '80%',
              },
            }}
          >
            Login
          </Button>
          <Box width={300}>
            <Typography fontWeight={500} color={appColorTheme.secondaryColor} mt={0.5}>
              Don't have account .?{' '}
              <span className='loginFormSignUpSpan' onClick={handleSignUp}>
                SIGNUP
              </span>
            </Typography>
          </Box>
        </form>
      </Box>
    </Grow>
  );
};

export default LoginForm;
