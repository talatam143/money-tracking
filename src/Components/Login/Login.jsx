import { Box, Button, Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import brandLogo from '../../Assets/Images/transaction_128.png';
import './Login.css';
import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm';
import { authServiceHandler } from '../../Services/Auth/Authentication';
import { useSelector } from 'react-redux';

const Login = () => {
  const [loginCard, setLoginCard] = useState(false);
  const [signupCard, setSignupCard] = useState(false);
  const token = localStorage.getItem('userId');
  const newUser = localStorage.getItem('isNewUser');
  const navigate = useNavigate();
  const appColorTheme = useSelector((state) => state.colorState);

  useEffect(() => {
    if (token) {
      fetchAuth();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const fetchAuth = async () => {
    let res = await authServiceHandler('authenticateUser', {}, '', 'GET');
    if (res.status === 200 && !newUser) {
      navigate('/');
    } else if (res.status === 200 && newUser) {
      navigate('/account/newpayments');
    }
  };

  const handleSignUp = () => {
    setLoginCard(false);
    setSignupCard(true);
  };

  const handleLogin = () => {
    setSignupCard(false);
    setLoginCard(true);
  };

  return (
    <Stack
      direction='column'
      alignItems='center'
      justifyContent={signupCard ? 'none' : 'center'}
      textAlign='center'
      gap={1}
      height='100vh !important'
    >
      <img src={brandLogo} alt='brand-logo' className={signupCard ? 'loginFormSignupForm' : null} />
      {!signupCard ? (
        <Box borderRadius={2} p={1} sx={{ fontSize: '25px', color: appColorTheme.secondaryColor }}>
          <Typography variant='h5' className='loginCardHeadings'>
            Making Money Management a Breeze - Dive In Now to Start Saving!
          </Typography>
        </Box>
      ) : null}
      {!loginCard && !signupCard ? (
        <Stack direction='column' gap={1}>
          <Button
            variant='contained'
            className='loginCardButtons'
            onClick={() => setLoginCard(true)}
            size='small'
          >
            Login
          </Button>
          <Button
            variant='contained'
            className='loginCardButtons'
            onClick={() => setSignupCard(true)}
            size='small'
          >
            Singup
          </Button>
        </Stack>
      ) : null}
      {loginCard ? <LoginForm isChecked={loginCard} handleSignUp={handleSignUp} /> : null}
      {signupCard ? <SignUpForm isChecked={signupCard} handleLogin={handleLogin} /> : null}
    </Stack>
  );
};

export default Login;
