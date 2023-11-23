import {
  AppBar,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Paper,
  Slide,
  Stack,
  Toolbar,
  Tooltip,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import StyledTextField from '../MuiComponents/InputField';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch, useSelector } from 'react-redux';
import CustomSelect from '../MuiComponents/CustomSelect';
import dayjs from 'dayjs';
import CustomDatePicker from '../MuiComponents/CustomDatePicker';
import { IconInfoSquareFilled, IconTag, IconUserHexagon } from '@tabler/icons-react';
import CustomButton from '../MuiComponents/CustomButton';
import { userPaymentDataHandler } from '../../Services/User/PaymentData';
import { formatpaymentInformation } from '../Utils/formatData';
import { setUserData } from '../../features/User/UserData';
import { addTransaction } from '../../Services/Transactions/Transactions';
import { resetLoader, startLoader } from '../../features/ProgressLoader/ProgressLoader';
import { startSnackbar } from '../../features/SnackBar/SnackBar';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />;
});

const initalFormState = {
  title: '',
  description: '',
  amount: '',
  category: '',
  paymentMethod: '',
  paymentInfo: '',
  bank: '',
  transactionDate: dayjs(Date.now()),
  starred: false,
  members: '',
  tags: '',
};

const intialMembersTags = { members: [], tags: [] };

const TransactionForm = (props) => {
  const { openState, handleCloseDialog } = props;
  const [transactionFormData, setTransactionFormData] = useState(initalFormState);
  const [membersTags, setMemebersTags] = useState(intialMembersTags);
  const [formError, SetFormError] = useState(false);
  const [discardState, setDiscardState] = useState(false);
  const [isFormChanged, setFormChanged] = useState(false);

  const appColorTheme = useSelector((state) => state.colorState);
  const userDetails = useSelector((state) => state.userData);
  const dispatch = useDispatch();

  const fetchUserDetails = async () => {
    const response = await userPaymentDataHandler('getUserDetails', {}, '/getuserdetails', 'GET');
    if (response.status === 200) {
      var data = formatpaymentInformation(response.data);
      dispatch(setUserData(data));
    }
  };

  useEffect(() => {
    if (!userDetails.isUserDatafetced) {
      fetchUserDetails();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userDetails]);

  const handleTransactionSubmit = async (e) => {
    e.preventDefault();
    if (transactionFormData.amount.length === 0 || transactionFormData.title.trim().length <= 3) {
      SetFormError(true);
    } else {
      dispatch(startLoader());
      let formData = {};
      Object.keys(transactionFormData).forEach((eachField) => {
        if (eachField === 'members' || eachField === 'tags') {
          if (membersTags[eachField].length > 0) {
            formData[eachField] = membersTags[eachField];
          }
        } else if (eachField === 'transactionDate') {
          formData[eachField] = transactionFormData[eachField];
        } else if (eachField === 'starred' && transactionFormData[eachField]) {
          formData[eachField] = transactionFormData[eachField];
        } else if (transactionFormData[eachField].length > 0) {
          if (eachField === 'amount') {
            formData[eachField] = Number(transactionFormData[eachField]);
          } else {
            formData[eachField] = transactionFormData[eachField];
          }
        }
      });
      const apiResponse = await addTransaction(formData);
      if (apiResponse.status === 200) {
        dispatch(resetLoader());
        dispatch(startSnackbar({ message: apiResponse.data.message, severity: 'success' }));
        handleCloseForm('approved');
      } else {
        dispatch(startSnackbar({ message: apiResponse.data.errorMessage, severity: 'error' }));
        dispatch(resetLoader());
      }
    }
  };

  const handleCloseForm = (approved) => {
    if (approved === 'approved') {
      setDiscardState(false);
      setFormChanged(false);
      setTransactionFormData(initalFormState);
      setMemebersTags(intialMembersTags);
      handleCloseDialog();
    } else if (isFormChanged) {
      setDiscardState(true);
    } else {
      setTransactionFormData(initalFormState);
      setMemebersTags(intialMembersTags);
      handleCloseDialog();
    }
    SetFormError(false);
  };

  const handleFormChange = (e) => {
    if (!isFormChanged) {
      setFormChanged(true);
    }
    if (formError && (e.target.name === 'amount' || e.target.name === 'title')) {
      SetFormError(false);
    }
    if (e.target.type === 'checkbox') {
      setTransactionFormData((prevData) => ({ ...prevData, [e.target.name]: e.target.checked }));
    } else {
      setTransactionFormData((prevData) => ({ ...prevData, [e.target.name]: e.target.value }));
    }
  };

  const handleFormDateChange = (e) => {
    setTransactionFormData((prevData) => ({
      ...prevData,
      transactionDate: e,
    }));
  };

  const handleAddArray = (type) => {
    if (transactionFormData[type].length !== 0) {
      setMemebersTags((prevData) => ({
        ...prevData,
        [type]: [...prevData[type], transactionFormData[type]],
      }));
      setTransactionFormData((prevData) => ({ ...prevData, [type]: '' }));
    }
  };

  const handleDeleteArray = (type, item) => {
    setMemebersTags((prevData) => ({
      ...prevData,
      [type]: prevData[type].filter((eachItem) => eachItem !== item),
    }));
  };

  return (
    <Dialog
      open={openState}
      TransitionComponent={Transition}
      keepMounted
      aria-describedby='transactionFormDialog'
      fullScreen
    >
      <AppBar sx={{ position: 'relative', background: appColorTheme.primaryColor }}>
        <Toolbar>
          <IconButton edge='start' color='inherit' onClick={handleCloseForm} aria-label='close'>
            <CloseIcon />
          </IconButton>
          <Typography sx={{ ml: 2, flex: 1 }} variant='h6' component='div'>
            Add transaction
          </Typography>
          <Button autoFocus color='inherit' onClick={handleTransactionSubmit}>
            save
          </Button>
        </Toolbar>
      </AppBar>
      <DialogContent>
        <form onSubmit={handleTransactionSubmit}>
          <Stack flexDirection='row' gap={2} alignItems='center'>
            <Stack sx={{ width: '50%' }} gap={1}>
              <StyledTextField
                name='title'
                label='Title'
                variant='standard'
                type='text'
                isAutoFocus={true}
                width={'100%'}
                isSize={true}
                value={transactionFormData.title}
                handleInputChange={handleFormChange}
              />
              <StyledTextField
                name='amount'
                label='Amount'
                variant='standard'
                type='number'
                isAutoFocus={false}
                width={'100%'}
                isSize={true}
                value={transactionFormData.amount}
                handleInputChange={handleFormChange}
              />
            </Stack>
            <StyledTextField
              name='description'
              label='Description'
              variant='outlined'
              rows={3.7}
              type='text'
              isAutoFocus={false}
              width={'50%'}
              isSize={true}
              multiline={true}
              value={transactionFormData.description}
              handleInputChange={handleFormChange}
            />
          </Stack>
          <Stack sx={{ mt: 4 }} flexDirection='row' alignItems='center' flexWrap='no-wrap' gap={2}>
            <CustomDatePicker
              label='Transaction  Date'
              handleFormDateChange={handleFormDateChange}
              value={transactionFormData.transactionDate}
              width='100%'
            />
            <CustomSelect
              id='transactionPaymentMethod'
              value={transactionFormData.paymentMethod}
              size='small'
              variant='outlined'
              handleChange={handleFormChange}
              name='paymentMethod'
              labelText='Payment Method'
              width='100%'
            />
          </Stack>
          <Stack sx={{ mt: 3 }} flexDirection='row' alignItems='center' flexWrap='no-wrap' gap={2}>
            <CustomSelect
              id='transactionBank'
              value={transactionFormData.bank}
              size='small'
              variant='outlined'
              handleChange={handleFormChange}
              name='bank'
              labelText='Select Bank'
              width='50%'
            />
            <CustomSelect
              id='transactionPaymentInfo'
              value={transactionFormData.paymentInfo}
              method={transactionFormData.paymentMethod}
              size='small'
              variant='outlined'
              handleChange={handleFormChange}
              name='paymentInfo'
              labelText='Payment Information'
              width='50%'
            />
          </Stack>
          <Stack
            sx={{ mt: 3 }}
            flexDirection='row'
            alignItems='center'
            justifyContent='space-between'
            flexWrap='no-wrap'
            gap={2}
          >
            <CustomSelect
              id='transactionCategory'
              value={transactionFormData.category}
              size='small'
              variant='outlined'
              handleChange={handleFormChange}
              name='category'
              labelText='Select Category'
              width='72%'
            />
            <Stack flexDirection='row' alignItems='center' gap={2}>
              <Paper elevation={3} sx={{ width: '3.5em', borderRadius: '8px' }}>
                <label className='switch'>
                  <input
                    type='checkbox'
                    onChange={handleFormChange}
                    name='starred'
                    checked={transactionFormData.starred}
                  />
                  <span className='slider'></span>
                </label>
              </Paper>
              <Tooltip title='Toggle to make transaction starred'>
                <IconInfoSquareFilled />
              </Tooltip>
            </Stack>
          </Stack>
          <Stack sx={{ mt: 3 }} flexDirection='row' alignItems='center' flexWrap='no-wrap' gap={2}>
            <Stack flexDirection='row' alignItems='stretch' width='50%'>
              <StyledTextField
                name='members'
                label='Members'
                variant='outlined'
                type='text'
                isAutoFocus={false}
                width={'100%'}
                isSize={true}
                value={transactionFormData.members}
                handleInputChange={handleFormChange}
              />
              <CustomButton handleClick={() => handleAddArray('members')} />
            </Stack>
            <Stack flexDirection='row' alignItems='stretch' width='50%'>
              <StyledTextField
                name='tags'
                label='Tags'
                variant='outlined'
                type='text'
                isAutoFocus={false}
                width={'100%'}
                isSize={true}
                value={transactionFormData.tags}
                handleInputChange={handleFormChange}
              />
              <CustomButton handleClick={() => handleAddArray('tags')} />
            </Stack>
          </Stack>
          <Stack
            sx={{ mt: 1 }}
            flexDirection='row'
            alignItems='baseline'
            flexWrap='no-wrap'
            gap={1}
          >
            {Object.keys(membersTags).map((eachArray) => (
              <Stack
                width='100%'
                flexDirection='row'
                alignItems='center'
                gap={1}
                flexWrap='wrap'
                key={eachArray}
              >
                {membersTags[eachArray]?.map((eachItem) => (
                  <Chip
                    key={eachItem}
                    onDelete={() => handleDeleteArray(eachArray, eachItem)}
                    icon={
                      eachArray === 'tags' ? (
                        <IconTag color={appColorTheme.backgroundColor} />
                      ) : (
                        <IconUserHexagon color={appColorTheme.backgroundColor} />
                      )
                    }
                    label={eachItem}
                    sx={{
                      background: appColorTheme.primaryColor,
                      color: appColorTheme.backgroundColor,
                      fontSize: '17px',
                      fontWeight: 500,
                    }}
                  />
                ))}
              </Stack>
            ))}
          </Stack>
          <Stack alignItems='center'>
            <Button
              onClick={handleTransactionSubmit}
              variant='contained'
              sx={{
                mt: 3,
                width: '150px',
                background: appColorTheme.primaryColor,
                color: appColorTheme.backgroundColor,
                fontWeight: 600,
                fontSize: '18px',
                '&:active': {
                  background: appColorTheme.primaryColor,
                  color: appColorTheme.backgroundColor,
                },
                '&:hover': {
                  background: appColorTheme.primaryColor,
                  opacity: '80%',
                },
              }}
            >
              Save
            </Button>
          </Stack>
        </form>
        <ul
          style={{
            marginTop: '50px',
            color: appColorTheme.name === 'Dark theme' ? '#FFFFFF' : null,
          }}
        >
          <li style={{ color: formError ? 'red' : null, fontWeight: formError ? 600 : null }}>
            Title & Amount fileds are required to save transaction.
          </li>
          {!userDetails?.userData?.bankDetails ? (
            <li style={{ color: 'red', fontWeight: 600 }}>
              You haven't added any bank accounts yet, so you can't choose one until you do.
            </li>
          ) : null}
          {!userDetails?.userData?.creditCardsDetails || !userDetails?.userData?.upiDetails ? (
            <li style={{ color: 'red', fontWeight: 600 }}>
              You haven't added few payment information, so you can't choose one until you do.
            </li>
          ) : null}
          <li>Manage all payment info easily in the account menu.</li>
          <li>For better analytics, consider completing as many fields as you can.</li>
          <li>Today's date is auto-filled by default.</li>
        </ul>
      </DialogContent>

      <Dialog open={discardState}>
        <DialogTitle id='alert-dialog-title'>Do you want to discard ?</DialogTitle>
        <DialogActions>
          <Button
            onClick={() => handleCloseForm('approved')}
            variant='outlined'
            color='success'
            size='small'
          >
            Yes
          </Button>
          <Button
            onClick={() => setDiscardState(false)}
            variant='outlined'
            color='warning'
            size='small'
          >
            No
          </Button>
        </DialogActions>
      </Dialog>
    </Dialog>
  );
};

export default TransactionForm;
