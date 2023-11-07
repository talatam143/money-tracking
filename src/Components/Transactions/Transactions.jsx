import React, { useState } from 'react';
import { Box, Button } from '@mui/material';

import './Transactions.css';
import { AddIcon } from '../../Assets/Icons/Icons';
import TransactionsFilterBar from './TransactionsFilterBar';
import FormDialog from './FormDialog';

const Transactions = () => {
  const [dialogState, setDialogState] = useState(false);

  const handleCloseDialog = () => {
    setDialogState(false);
  };

  return (
    <Box className='transactionsContainer'>
      <TransactionsFilterBar />
      <FormDialog openState={dialogState} handleCloseDialog={handleCloseDialog} />
      <Button
        variant='contained'
        className='transactionsAddButton'
        onClick={() => setDialogState(true)}
      >
        New Transaction
        <span className='transactionsAddButtonSpan'>
          <AddIcon />
        </span>
      </Button>
    </Box>
  );
};

export default Transactions;
