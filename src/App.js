import { Routes, Route, BrowserRouter } from 'react-router-dom';
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
import NotFound from './Components/Error/NotFound';

const theme = createTheme({
  typography: {
    fontFamily: 'Tajawal, sans-serif',
  },
});

function App() {
  const progressLoader = useSelector((state) => state.progressLoader.loadingState);
  const snackBar = useSelector((state) => state.snackBar);
  const dispatch = useDispatch();

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    dispatch(resetSnackBar());
  };

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        {progressLoader ? <LinearProgress /> : null}
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
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/transactions' element={<Transactions />} />
          <Route path='/account'>
            <Route path='/account' element={<Account />} />
            <Route path='newpayments' element={<NewUser />} />
          </Route>
          <Route path='/login' element={<Login />} />
          <Route path='/not-found' element={<NotFound />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
