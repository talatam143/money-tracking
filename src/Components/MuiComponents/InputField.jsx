import React from 'react';
import { IconButton, InputAdornment, TextField } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useSelector } from 'react-redux';

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
    isSize,
    multiline,
    rows,
  } = props;

  const { type: iconType, handleClick, iconStatus } = endAdornmentIcon || {};
  const appColorTheme = useSelector((state) => state.colorState);

  return (
    <TextField
      size={isSize ? 'small' : 'medium'}
      label={label}
      value={value}
      variant={variant}
      multiline={multiline ? true : false}
      rows={multiline ? rows : null}
      name={name}
      type={endAdornmentIcon ? (iconStatus ? type : 'text') : type}
      autoFocus={isAutoFocus}
      onChange={handleInputChange}
      error={error ? true : false}
      helperText={error ? errorText : null}
      InputProps={{
        style: { color: appColorTheme.name === 'Dark theme' ? '#FFFFFF' : null },
        endAdornment:
          iconType === 'password' ? (
            <InputAdornment position='end'>
              <IconButton aria-label='toggle password visibility' onClick={handleClick} edge='end'>
                {iconStatus ? (
                  <Visibility
                    sx={{ fill: appColorTheme.name === 'Dark theme' ? '#FFFFFF' : null }}
                  />
                ) : (
                  <VisibilityOff
                    sx={{ fill: appColorTheme.name === 'Dark theme' ? '#FFFFFF' : null }}
                  />
                )}
              </IconButton>
            </InputAdornment>
          ) : null,
      }}
      sx={{
        width: { width },
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
            borderColor: `${appColorTheme.secondaryColor} !important`,
            borderWidth: 1,
          },
        },
        '& .MuiOutlinedInput-root:hover fieldset': {
          borderColor: `${appColorTheme.secondaryColor} !important`,
        },
        '& .MuiInputBase-root.MuiInput-root ': {
          borderBottom: `1px solid ${appColorTheme.secondaryColor}`,
        },
        '& .MuiInputBase-root.MuiInput-root:after ': {
          borderBottom: `2px solid ${appColorTheme.secondaryColor}`,
        },
        '& input[type=number]::-webkit-inner-spin-button, & input[type=number]::-webkit-outer-spin-button':
          {
            WebkitAppearance: 'none',
            appearance: 'none',
            margin: 0,
          },
        color: 'red',
      }}
    />
  );
}

export default StyledTextField;
