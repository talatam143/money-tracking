import React from 'react';
import { IconButton, InputAdornment, TextField } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const ModifiedTextField = styled(TextField)(() => ({
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
      WebkitAppearance: 'none',
      appearance: 'none',
      margin: 0,
    },
}));

function StyledTextField(props) {
  const {
    label,
    variant,
    type,
    isAutoFocus,
    width,
    handleInputChange,
    value,
    name,
    error,
    errorText,
    endAdornmentIcon,
  } = props;

  const { type: iconType, handleClick, iconStatus } = endAdornmentIcon || {};

  return (
    <ModifiedTextField
      label={label}
      value={value}
      variant={variant}
      name={name}
      type={endAdornmentIcon ? (iconStatus ? type : 'text') : type}
      autoFocus={isAutoFocus}
      sx={{ width: { width } }}
      onChange={handleInputChange}
      error={error ? true : false}
      helperText={error ? errorText : null}
      InputProps={{
        endAdornment:
          iconType === 'password' ? (
            <InputAdornment position='end'>
              <IconButton aria-label='toggle password visibility' onClick={handleClick} edge='end'>
                {iconStatus ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          ) : null,
      }}
    />
  );
}

export default StyledTextField;
