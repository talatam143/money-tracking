import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import React from 'react';
import { useSelector } from 'react-redux';

const CustomDatePicker = (props) => {
  const { label, handleFormDateChange, value, width } = props;
  const appColorTheme = useSelector((state) => state.colorState);
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DatePicker']} sx={{ width: width }}>
        <DatePicker
          label={label}
          value={value}
          onChange={handleFormDateChange}
          min
          sx={{
            '.MuiFormControl-root.MuiTextField-root': {
              width: '150px',
              minWidth: 'unset',
            },
            '& .MuiInputBase-input.MuiOutlinedInput-input': {
              height: '10px',
              width: '100px',
            },
            '& .MuiInputBase-input.MuiOutlinedInput-input ': {
              color: appColorTheme.name === 'Dark theme' ? '#FFFFFF ' : null,
            },
            '& .MuiButtonBase-root.MuiIconButton-root ': {
              color: appColorTheme.name === 'Dark theme' ? '#FFFFFF ' : null,
            },
            '& .MuiInputLabel-root': {
              color: appColorTheme.secondaryColor,
              fontWeight: 500,
              fontSize: 18,
            },
            '& .MuiInputLabel-root.Mui-focused': {
              color: appColorTheme.secondaryColor,
            },
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: appColorTheme.secondaryColor,
                borderWidth: 1,
              },
            },
            '& .MuiOutlinedInput-root:hover fieldset': {
              borderColor: appColorTheme.secondaryColor,
            },
            '& input[type=number]::-webkit-inner-spin-button, & input[type=number]::-webkit-outer-spin-button':
              {
                appearance: 'none',
                margin: 0,
              },
          }}
        />
      </DemoContainer>
    </LocalizationProvider>
  );
};

export default CustomDatePicker;
