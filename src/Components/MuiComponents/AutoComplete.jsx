import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { Chip } from '@mui/material';
import { useSelector } from 'react-redux';

const handleSubmit = (event) => {
  event.preventDefault();
};

const FreeSoloAutoCompleteBox = (props) => {
  const { data, label, id, value, handleChange } = props;
  const appColorTheme = useSelector((state) => state.colorState);

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
                background: appColorTheme.secondaryColor,
                color: '#FFFFFF',
                fontSize: '16px',
                fontWeight: '400',
              }}
            />
          ))
        }
        renderInput={(params) => (
          <TextField
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
            sx={{
              '& .MuiAutocomplete-clearIndicator': {
                color: { color: appColorTheme.name === 'Dark theme' ? '#FFFFFF' : null },
              },
              '& .MuiOutlinedInput-root.MuiInputBase-sizeSmall': {
                color: { color: appColorTheme.name === 'Dark theme' ? '#FFFFFF' : null },
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
                  borderColor: `${appColorTheme.secondaryColor} !important`,
                  borderWidth: 1,
                },
              },
              '& .MuiOutlinedInput-root:hover fieldset': {
                borderColor: `${appColorTheme.secondaryColor} !important`,
              },
              '& input[type=number]::-webkit-inner-spin-button, & input[type=number]::-webkit-outer-spin-button':
                {
                  WebkitAppearance: 'none',
                  appearance: 'none',
                  margin: 0,
                },
            }}
          />
        )}
      />
      <button type='button' style={{ display: 'none' }} onClick={handleSubmit} />
    </form>
  );
};

export default FreeSoloAutoCompleteBox;
