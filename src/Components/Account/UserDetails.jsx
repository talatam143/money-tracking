import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Stack,
} from '@mui/material';
import MuiAccordin from '../MuiComponents/Accordin';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { CloseIcon } from '../../Assets/Icons/Icons';
import FreeSoloAutoCompleteBox from '../MuiComponents/AutoComplete';
import { bankData, cardsData, upiData } from '../Constant Data/Data';
import { forceUpdateDetails } from '../../Services/User/UserDetails';
import { setUserData } from '../../features/User/UserData';
import { startLoader, resetLoader } from '../../features/ProgressLoader/ProgressLoader';
import { startSnackbar } from '../../features/SnackBar/SnackBar';
import { formatpaymentInformation } from '../Utils/formatData';

const AddButton = (props) => {
  const { name, type, handleAddData } = props;
  return (
    <Button
      variant='contained'
      sx={{
        display: 'flex',
        alignItems: 'center',
        background: '#2b3467',
        color: '#fcffe7',
        flexGrow: 1,
        borderRadius: '8px',
        '&:active': {
          background: '#2b3467',
        },
        '&:hover': {
          background: '#2b3467',
          opacity: '90%',
        },
      }}
      onClick={() => handleAddData(type)}
    >
      {name}
    </Button>
  );
};

const UserDetails = () => {
  const [localUserData, setLocalUserData] = useState({});
  const [accordinState, setAccordinState] = useState(false);
  const [handleDialog, setHandleDialog] = useState(false);
  const [dialogType, setDialogType] = useState('');
  const [editedData, setEditedData] = useState([]);
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.userData);

  useEffect(() => {
    setLocalUserData(userData.userData);
  }, [userData]);

  const handleAccordinChange = (panel) => (event, isExpanded) => {
    setAccordinState(isExpanded ? panel : false);
  };

  const handleAccordinEdit = (e, category) => {
    e.stopPropagation();
    let formattedData = localUserData[category].map((eachItem) => eachItem.name);
    setEditedData(formattedData);
    setDialogType(category);
    setHandleDialog(true);
  };

  const handleAddData = (type) => {
    setHandleDialog(true);
    setDialogType(type);
  };

  const handleDialogClose = () => {
    setEditedData([]);
    setDialogType('');
    setHandleDialog(false);
  };

  const handleChange = (event, newValue, id) => {
    setEditedData(newValue);
  };

  const handleUpdateData = async () => {
    dispatch(startLoader());
    const response = await forceUpdateDetails({ [dialogType]: editedData });
    if (response.status === 200) {
      dispatch(resetLoader());
      var data = formatpaymentInformation(response.data.data.data);
      dispatch(startSnackbar({ message: response.data.data.message, severity: 'success' }));
      dispatch(setUserData(data));
      setEditedData([]);
      handleDialogClose();
    } else {
      console.log(response);
      dispatch(startSnackbar({ message: response.data.data.errorMessage, severity: 'error' }));
      dispatch(resetLoader());
    }
  };

  return (
    <Box sx={{ width: '95%', margin: 'auto' }}>
      {Object.keys(localUserData)?.map?.((eachItem) => (
        <Box
          sx={{
            border: 'solid 2px #eb455f',
            borderRadius: '15px',
            mb: 2,
          }}
          key={eachItem}
        >
          <MuiAccordin
            category={eachItem}
            accordinState={accordinState}
            handleAccordinChange={handleAccordinChange}
            ExpandMoreIcon={ExpandMoreIcon}
            handleAccordinEdit={handleAccordinEdit}
            data={localUserData[eachItem]}
          />
        </Box>
      ))}

      <Stack
        spacing={{ xs: 1, sm: 2 }}
        direction='row'
        useFlexGap
        flexWrap='wrap'
        divider={<Divider orientation='vertical' flexItem />}
      >
        {!Object.keys(localUserData)?.includes('bankDetails') ? (
          <AddButton name='Add Bank' type='bankDetails' handleAddData={handleAddData} />
        ) : null}
        {!Object.keys(localUserData)?.includes('creditCardsDetails') ? (
          <AddButton
            name='Add Credit Card'
            type='creditCardsDetails'
            handleAddData={handleAddData}
          />
        ) : null}
        {!Object.keys(localUserData)?.includes('upiDetails') ? (
          <AddButton name='Add UPI' type='upiDetails' handleAddData={handleAddData} />
        ) : null}
      </Stack>
      <Dialog
        open={handleDialog}
        fullWidth
        keepMounted
        aria-describedby='alert-dialog-slide-description'
      >
        <DialogTitle
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            cursor: 'pointer',
          }}
          onClick={handleDialogClose}
        >
          {dialogType === 'bankDetails'
            ? 'Add Bank'
            : dialogType === 'creditCardsDetails'
            ? 'Add Credit Card'
            : 'Add UPI'}
          <CloseIcon />
        </DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-slide-userData' sx={{ pt: 1 }}>
            <FreeSoloAutoCompleteBox
              data={
                dialogType === 'bankDetails'
                  ? bankData
                  : dialogType === 'creditCardsDetails'
                  ? cardsData
                  : upiData
              }
              id='bankDetails'
              label='Select details'
              value={editedData}
              handleChange={handleChange}
            />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            size='small'
            sx={{
              margin: 'auto',
              background: '#eb455f',
              color: '#fcffe7',
              fontWeight: 600,
              fontSize: '15px',
              '&:active': {
                background: '#eb455f',
                color: '#fcffe7',
              },
              '&:hover': {
                background: '#eb455f',
                opacity: '80%',
              },
            }}
            onClick={handleUpdateData}
          >
            update
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default UserDetails;
