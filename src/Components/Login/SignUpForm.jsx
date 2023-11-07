import React, { useState } from 'react';
import { Box, Button, Grow, Stack, Typography } from '@mui/material';
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import KeyboardBackspaceSharpIcon from '@mui/icons-material/KeyboardBackspaceSharp';
import { useDispatch } from 'react-redux';
import { startLoader, resetLoader } from '../../features/ProgressLoader/ProgressLoader';

import StyledTextField from '../MuiComponents/InputField';
import './Login.css';
import { signUp } from '../../Services/Auth/Authentication';
import { startSnackbar } from '../../features/SnackBar/SnackBar';
import { useNavigate } from 'react-router-dom';
import { setUserLogin } from '../../features/User/UserSlice';

const errorText = {
  name: 'Name should contain atleast three words',
  email: 'Invalid Email address',
  mobileNumber: 'Mobile Number must have 10 digits.',
  dateOfBirth: 'You should have atleast 18 Years to create account',
  mpin: 'MPIN must have 4 digits.',
  password:
    'Password must have 8+ chars with 1 uppercase, 1 lowercase, 1 digit, and 1 special character.',
};

const initialErrorState = {
  name: false,
  email: false,
  mobileNumber: false,
  dateOfBirth: false,
  password: false,
  mpin: false,
};

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[/@.$!%*#?&])[A-Za-z\d/@$.!%*#?&]{8,}$/;

const SignUpForm = (props) => {
  const { isChecked, handleLogin } = props;
  const [formState, setFormState] = useState(isChecked);
  const [showPassword, setShowPassword] = useState(false);
  const [signupData, setSignUpData] = useState({
    name: '',
    email: '',
    password: '',
    dateOfBirth: dayjs('2022-04-17'),
    mobileNumber: '',
    mpin: '',
  });
  const [errorState, setErrorState] = useState(initialErrorState);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignUpSubmit = async (e) => {
    e.preventDefault();

    if (signupData.mpin.length !== 4) {
      setErrorState({ ...errorState, mpin: true });
    } else if (!passwordRegex.test(signupData.password)) {
      setErrorState({ ...errorState, password: true });
    } else {
      dispatch(startLoader());
      const response = await signUp(signupData);
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

  const handleNextForm = () => {
    const currentDate = dayjs();
    const selectedDate = signupData.dateOfBirth;
    const getYears = currentDate.diff(selectedDate, 'years');

    if (signupData.name.length < 3) {
      setErrorState({ ...errorState, name: true });
    } else if (!emailRegex.test(signupData.email)) {
      setErrorState({ ...errorState, email: true });
    } else if (signupData.mobileNumber.length !== 10) {
      setErrorState({ ...errorState, mobileNumber: true });
    } else if (getYears && getYears < 18) {
      setErrorState({ ...errorState, dateOfBirth: true });
    } else {
      setFormState(false);
    }
  };

  const handleSignUpFormChange = (e) => {
    const { name, value } = e.target;

    const isFieldInvalid = () => {
      if (name === 'name' && value.trim().length < 3) {
        return true;
      }
      if (name === 'email' && !emailRegex.test(value)) {
        return true;
      }
      if (name === 'mpin' && value.length !== 4) {
        return true;
      }
      if (name === 'mobileNumber' && value.length !== 10) {
        return true;
      }
      if (name === 'password' && !passwordRegex.test(value)) {
        return true;
      }

      return false;
    };

    setErrorState((prevErrorData) => ({
      ...prevErrorData,
      [name]: isFieldInvalid(),
    }));

    setSignUpData((prevSignUpData) => ({
      ...prevSignUpData,
      [name]: value,
    }));
  };

  const handleDateChange = (e) => {
    const currentDate = dayjs();
    const selectedDate = e;

    const daysDifference = currentDate.diff(selectedDate, 'years');
    setSignUpData((prevSignUpData) => ({
      ...prevSignUpData,
      dateOfBirth: e,
    }));

    if (daysDifference < 18) {
      setErrorState((prevErrorData) => ({
        ...prevErrorData,
        dateOfBirth: true,
      }));
    } else {
      setErrorState((prevErrorData) => ({
        ...prevErrorData,
        dateOfBirth: false,
      }));
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
          borderColor: '#eb455f',
          borderRadius: '50px 50px 0 0',
        }}
        width='100%'
      >
        <form type='submit' className='signupFormContainer' onSubmit={handleSignUpSubmit}>
          {formState ? (
            <>
              <StyledTextField
                name='name'
                label='Name'
                value={signupData.name}
                variant='outlined'
                type='text'
                isAutoFocus={true}
                width={300}
                errorText={errorText.name}
                error={errorState.name}
                handleInputChange={handleSignUpFormChange}
              />
              <StyledTextField
                name='email'
                label='Email'
                value={signupData.email}
                variant='outlined'
                type='email'
                isAutoFocus={false}
                width={300}
                errorText={errorText.email}
                error={errorState.email}
                handleInputChange={handleSignUpFormChange}
              />
              <StyledTextField
                name='mobileNumber'
                label='Mobile Number'
                value={signupData.mobileNumber}
                variant='outlined'
                type='number'
                isAutoFocus={false}
                width={300}
                errorText={errorText.mobileNumber}
                error={errorState.mobileNumber}
                handleInputChange={handleSignUpFormChange}
              />
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['DatePicker']} sx={{ width: '300px' }}>
                  <DatePicker
                    label='Date of birth'
                    value={signupData.dateOfBirth}
                    onChange={handleDateChange}
                    slotProps={{
                      textField: {
                        helperText: errorState.dateOfBirth ? errorText.dateOfBirth : '',
                      },
                    }}
                    min
                    sx={{
                      '& .MuiInputLabel-root': {
                        color: '#2b3467',
                        fontWeight: 500,
                        fontSize: 18,
                      },
                      '& .MuiInputLabel-root.Mui-focused': {
                        color: '#2b3467', // Label color when focused (black)
                      },
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                          borderColor: '#2b3467 !important',
                          borderWidth: 1,
                        },
                      },
                      '& .MuiOutlinedInput-root:hover fieldset': {
                        borderColor: '#2b3467 !important',
                      },
                      '& input[type=number]::-webkit-inner-spin-button, & input[type=number]::-webkit-outer-spin-button':
                        {
                          '-webkit-appearance': 'none',
                          appearance: 'none',
                          margin: 0,
                        },
                    }}
                  />
                </DemoContainer>
              </LocalizationProvider>
              <Button
                type='button'
                onClick={handleNextForm}
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
                NEXT
              </Button>
            </>
          ) : (
            <Grow
              in={!formState}
              style={{ transformOrigin: 'right' }}
              {...(!formState ? { timeout: 1000 } : {})}
            >
              <Stack direction='column' alignItems='center' textAlign='center' gap={1}>
                <KeyboardBackspaceSharpIcon
                  fontSize='large'
                  sx={{ alignSelf: 'flex-start', marginBottom: '10px', fill: '#f96178' }}
                  onClick={() => setFormState(true)}
                />
                <StyledTextField
                  name='mpin'
                  label='MPIN'
                  value={signupData.mpin}
                  variant='outlined'
                  type='number'
                  isAutoFocus={false}
                  width={300}
                  errorText={errorText.mpin}
                  error={errorState.mpin}
                  handleInputChange={handleSignUpFormChange}
                />
                <StyledTextField
                  name='password'
                  label='Password'
                  value={signupData.password}
                  variant='outlined'
                  type='password'
                  isAutoFocus={false}
                  width={300}
                  errorText={errorText.password}
                  error={errorState.password}
                  handleInputChange={handleSignUpFormChange}
                  endAdornmentIcon={{
                    type: 'password',
                    handleClick: handleClickShowPassword,
                    iconStatus: showPassword,
                  }}
                />
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
                  SIGNUP
                </Button>
              </Stack>
            </Grow>
          )}
          <Box width={300}>
            <Typography fontWeight={500} color='#2b3467'>
              Already have account .?{' '}
              <span className='loginFormSignUpSpan' onClick={handleLogin}>
                Login
              </span>
            </Typography>
          </Box>
        </form>
      </Box>
    </Grow>
  );
};

export default SignUpForm;
