import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import styled from '@emotion/styled';
import { Chip } from '@mui/material';

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

const handleSubmit = (event) => {
  // This handles form submission and can capture the Enter key press on mobile devices
  event.preventDefault();
};

const FreeSoloAutoCompleteBox = (props) => {
  const { data, label, id, value, handleChange } = props;

  return (
    <form onSubmit={handleSubmit}>
      <Autocomplete
        multiple
        id={id}
        size='small'
        freeSolo
        value={value}
        onChange={(event, newValue) => handleChange(event, newValue, id)}
        options={data.map((option) => option.title)}
        renderTags={(value, getTagProps) =>
          value.map((option, index) => (
            <Chip
              label={option}
              {...getTagProps({ index })}
              sx={{
                background: '#2b3467',
                color: '#FFFFFF',
                fontSize: '16px',
                fontWeight: '400',
              }}
            />
          ))
        }
        renderInput={(params) => (
          <ModifiedTextField
            {...params}
            label={label}
            placeholder='Type/Search & Enter'
            onKeyDown={(event) => {
              const isEnterKey =
                event.key === 'Enter' || event.key === 'Done' || event.key === 'Go';

              if (isEnterKey) {
                event.preventDefault();
              }
            }}
          />
        )}
      />
      <button type='button' style={{ display: 'none' }} onClick={handleSubmit} />
    </form>
  );
};

export default FreeSoloAutoCompleteBox;
