import React, { useState } from 'react';
import { Box, Button, Grow, Typography } from '@mui/material';

import './Login.css';
import StyledTextField from '../MuiComponents/InputField';
import { signIn } from '../../Services/Auth/Authentication';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { resetLoader, startLoader } from '../../features/ProgressLoader/ProgressLoader';
import { startSnackbar } from '../../features/SnackBar/SnackBar';
import { setUserLogin } from '../../features/User/UserSlice';

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const emailErrortext = 'Invalid Email address';

const LoginForm = (props) => {
  const { isChecked, handleSignUp } = props;
  const [showPassword, setShowPassword] = useState(false);
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [emailError, setEmailError] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const dispatch = useDispatch();
  const naviagte = useNavigate();

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    dispatch(startLoader());
    const response = await signIn(loginData);
    if (response.status === 200) {
      dispatch(startSnackbar({ message: response.data.message, severity: 'success' }));
      dispatch(resetLoader());
      dispatch(setUserLogin(response.data));
      localStorage.setItem('userId', response.data.token);
      naviagte('/');
    } else {
      dispatch(startSnackbar({ message: response.data.errorMessage, severity: 'error' }));
      dispatch(resetLoader());
    }
  };

  const handleLoginChange = (e) => {
    const { name, value } = e.target;

    const isFieldInvalid = () => {
      if (name === 'email' && !emailRegex.test(value)) {
        return true;
      }
      return false;
    };

    setEmailError(isFieldInvalid());
    setLoginData((prevLoginData) => ({ ...prevLoginData, [e.target.name]: e.target.value }));
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
          borderColor: '#eb455f',
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
          <Box sx={{ textAlign: 'right' }} width={300}>
            <a href='/login' className='loginFormAnchorTag'>
              Forgot Password..?
            </a>
          </Box>
          <Button
            type='submit'
            variant='contained'
            sx={{
              width: '300px',
              background: '#eb455f',
              color: '#fcffe7',
              fontWeight: 500,
              fontSize: 16,
              '&:hover': {
                background: '#f96178',
              },
            }}
          >
            Login
          </Button>
          <Box width={300}>
            <Typography fontWeight={500} color='#2b3467' mt={0.5}>
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
