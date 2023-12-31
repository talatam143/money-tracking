import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom';
import { LinearProgress, Snackbar, ThemeProvider, createTheme } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import MuiAlert from '@mui/material/Alert';

import Footer from './Components/Footer/Footer';
import Home from './Components/Home/Home';
import Transactions from './Components/Transactions/Transactions';
import Account from './Components/Account/Account';
import Login from './Components/Login/Login';
import { resetSnackBar } from './features/SnackBar/SnackBar';
import NewUser from './Components/Account/NewUser';
import Error from './Components/Error/Error';
import NotFound from './Components/Error/NotFound';
import './Assets/Icons/Icons';
import { useEffect } from 'react';
import {
  secondaryTheme,
  blueTheme,
  greenTheme,
  greyTheme,
  defaultTheme,
  darkTheme,
} from './features/ColoeTheme/ColorTheme';

const theme = createTheme({
  typography: {
    fontFamily: 'Tajawal, sans-serif',
  },
});

function App() {
  const progressLoader = useSelector((state) => state.progressLoader.loadingState);
  const snackBar = useSelector((state) => state.snackBar);
  const dispatch = useDispatch();

  useEffect(() => {
    const localTheme = localStorage.getItem('theme');
    document.body.className = localTheme ? localTheme : 'defaultTheme';
    switch (localTheme) {
      case 'defaultTheme':
        dispatch(defaultTheme());
        break;
      case 'secondaryTheme':
        dispatch(secondaryTheme());
        break;
      case 'blueTheme':
        dispatch(blueTheme());
        break;
      case 'greenTheme':
        dispatch(greenTheme());
        break;
      case 'greyTheme':
        dispatch(greyTheme());
        break;
      case 'darkTheme':
        dispatch(darkTheme());
        break;
      default:
        dispatch(defaultTheme());
        break;
    }
  }, [dispatch]);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    dispatch(resetSnackBar());
  };

  return (
    <ThemeProvider theme={theme}>
      {progressLoader ? <LinearProgress id='loader' /> : null}
      <Snackbar open={snackBar.snackBarState} autoHideDuration={3000} onClose={handleClose}>
        <MuiAlert
          elevation={6}
          variant='filled'
          severity={snackBar.snackBarSeverity}
          onClose={handleClose}
          sx={{ width: '100%' }}
        >
          {snackBar.snackBarText}
        </MuiAlert>
      </Snackbar>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/transactions' element={<Transactions />} />
          <Route path='/account'>
            <Route path='/account' element={<Account />} />
            <Route path='newpayments' element={<NewUser />} />
          </Route>
          <Route path='/login' element={<Login />} />
          <Route path='/error' element={<Error />} />
          <Route path='/not-found' element={<NotFound />} />
          <Route path='*' element={<Navigate to='/not-found' replace />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
