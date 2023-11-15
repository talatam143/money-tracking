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
import { userPaymentDataHandler } from '../../Services/User/PaymentData';
import { setUserData } from '../../features/User/UserData';
import { startLoader, resetLoader } from '../../features/ProgressLoader/ProgressLoader';
import { startSnackbar } from '../../features/SnackBar/SnackBar';
import { formatpaymentInformation } from '../Utils/formatData';
import { paymentMetaData } from '../Utils/paymentsFormat';

const AddButton = (props) => {
  const { name, type, handleAddData } = props;
  const appColorTheme = useSelector((state) => state.colorState);
  return (
    <Button
      variant='contained'
      sx={{
        display: 'flex',
        alignItems: 'center',
        background: appColorTheme.secondaryColor,
        color: appColorTheme.backgroundColor,
        flexGrow: 1,
        borderRadius: '8px',
        '&:active': {
          background: appColorTheme.secondaryColor,
        },
        '&:hover': {
          background: appColorTheme.secondaryColor,
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
  const appColorTheme = useSelector((state) => state.colorState);

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
    const response = await userPaymentDataHandler(
      'forceUpdateDetails',
      { [dialogType]: editedData },
      '/forceupdate',
      'PUT',
    );
    if (response.status === 200) {
      dispatch(resetLoader());
      var data = formatpaymentInformation(response.data);
      dispatch(startSnackbar({ message: response.data.message, severity: 'success' }));
      dispatch(setUserData(data));
      setEditedData([]);
      handleDialogClose();
    } else {
      dispatch(startSnackbar({ message: response.data.errorMessage, severity: 'error' }));
      dispatch(resetLoader());
    }
  };

  return (
    <Box sx={{ width: '95%', margin: 'auto' }}>
      {Object.keys(localUserData)?.map?.((eachItem) => (
        <Box
          sx={{
            border: `solid 2px ${appColorTheme.primaryColor}`,
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
        {Object.keys(paymentMetaData)?.map((eachPayment) =>
          !Object.keys(localUserData).includes(eachPayment) ? (
            <AddButton
              key={paymentMetaData[eachPayment].id}
              name={paymentMetaData[eachPayment].buttonLabel}
              type={paymentMetaData[eachPayment].id}
              handleAddData={handleAddData}
            />
          ) : null,
        )}
      </Stack>
      {dialogType ? (
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
          >
            {paymentMetaData[dialogType].buttonLabel}
            <button
              onClick={handleDialogClose}
              style={{ background: 'none', border: 'none', cursor: 'pointer' }}
            >
              <CloseIcon />
            </button>
          </DialogTitle>

          <DialogContent>
            <DialogContentText id='alert-dialog-slide-userData' sx={{ pt: 1 }}>
              <FreeSoloAutoCompleteBox
                data={paymentMetaData[dialogType].data}
                id={paymentMetaData[dialogType].id}
                label={paymentMetaData[dialogType].inputLabel}
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
                background: appColorTheme.primaryColor,
                color: appColorTheme.backgroundColor,
                fontWeight: 600,
                fontSize: '15px',
                '&:active': {
                  background: appColorTheme.primaryColor,
                  color: appColorTheme.backgroundColor,
                },
                '&:hover': {
                  background: appColorTheme.primaryColor,
                  opacity: '80%',
                },
              }}
              onClick={handleUpdateData}
            >
              update
            </Button>
          </DialogActions>
        </Dialog>
      ) : null}
    </Box>
  );
};

export default UserDetails;
