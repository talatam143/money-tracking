import {
  Box,
  Dialog,
  DialogContent,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Slide,
  TextareaAutosize,
} from '@mui/material';
import React from 'react';
import StyledTextField from '../MuiComponents/InputField';
import styled from '@emotion/styled';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />;
});

const Categories = [
  'Movies',
  'Music',
  'Games',
  'Sports',
  'Groceries',
  'Dining Out',
  'Liquor',
  'Rent',
  'Household supplies',
  'Furniture',
  'Home maintenance',
  'Pets',
  'Electronics',
  'Insurance',
  'Clothing',
  'Gifts',
  'Medical expenses',
  'Taxes',
  'Education',
  'Parking',
  'Gas/Fuel',
  'Hotel',
  'Cab',
  'Travel',
  'General',
  'Electricity',
  'Water',
  'TV',
  'Mobile bills',
  'WIFI/Internet',
];

const FormDialog = (props) => {
  const { openState, handleCloseDialog } = props;

  const StyledTextarea = styled(TextareaAutosize)(
    ({ theme }) => `
    width: 97.8%;
    border-radius: 4px;
    color: "#2b3467";
    padding:1%;
  `,
  );

  const handleTransactionSubmit = (e) => {
    e.preventDefault();
    handleCloseDialog();
  };

  const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <Dialog
      open={openState}
      TransitionComponent={Transition}
      keepMounted
      aria-describedby='transactionFormDialog'
      fullWidth={true}
    >
      <DialogContent>
        <form onSubmit={handleTransactionSubmit}>
          <StyledTextField
            name='title'
            label='Title'
            variant='outlined'
            type='text'
            isAutoFocus={true}
            width={'100%'}
            isSize={true}
          />
          <StyledTextarea placeholder='Empty' minRows={3} maxRows={3} sx={{ width: '200px' }} />
          <Box>
            <StyledTextField
              name='amount'
              label='Amount'
              variant='outlined'
              type='number'
              isAutoFocus={true}
              width='40%'
              isSize={true}
            />
            <FormControl sx={{ m: 0, width: '50%' }} size='small'>
              <InputLabel id='transactioncategoryLabel'>Select Category</InputLabel>
              <Select
                labelId='transactioncategoryLabel'
                id='demo-select-small'
                value={age}
                label='Age'
                onChange={handleChange}
              >
                <MenuItem value=''>
                  <em>None</em>
                </MenuItem>
                {Categories?.map((eachCategory) => (
                  <MenuItem value={eachCategory} key={eachCategory}>
                    {eachCategory}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <FormControl sx={{ m: 0, width: '50%' }} size='small'>
            <InputLabel id='transactionPaymentLabel'>Payment Type</InputLabel>
            <Select
              labelId='transactionPaymentLabel'
              id='demo-select-small'
              value={age}
              label='Age'
              onChange={handleChange}
            >
              <MenuItem value=''>
                <em>None</em>
              </MenuItem>
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default FormDialog;
