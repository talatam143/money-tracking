import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { FormControl, InputLabel, ListSubheader, MenuItem, Select } from '@mui/material';
import { transactionCategories } from '../Constant Data/Data';

const paymentMethods = ['UPI', 'Credit Card', 'Debit Card', 'Intenet Baning', 'Cash'];

const CustomSelect = (props) => {
  const { id, value, size, width, variant, handleChange, name, labelText, method } = props;
  const [menuItems, setMenuItems] = useState([]);
  const appColorTheme = useSelector((state) => state.colorState);
  const userDetails = useSelector((state) => state.userData);

  useEffect(() => {
    if (name === 'paymentMethod') {
      setMenuItems(paymentMethods);
    } else if (userDetails?.isUserDatafetced) {
      if (name === 'bank' && userDetails?.userData?.bankDetails) {
        let filteredData = userDetails?.userData?.bankDetails.map((eachItem) => eachItem.name);
        setMenuItems(filteredData);
      } else if (method === 'UPI' && userDetails?.userData?.upiDetails) {
        let filteredData = userDetails?.userData?.upiDetails.map((eachItem) => eachItem.name);
        setMenuItems(filteredData);
      } else if (method === 'Credit Card' && userDetails?.userData?.creditCardsDetails) {
        let filteredData = userDetails?.userData?.creditCardsDetails.map(
          (eachItem) => eachItem.name,
        );
        setMenuItems(filteredData);
      } else {
        setMenuItems([]);
      }
    }
  }, [method, name, userDetails]);

  return (
    <FormControl
      size={size}
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
      }}
    >
      <InputLabel
        id={id}
        sx={{
          color: appColorTheme.secondaryColor,
        }}
      >
        {labelText}
      </InputLabel>
      <Select
        labelId={id}
        variant={variant}
        value={value}
        name={name}
        label={labelText}
        onChange={handleChange}
        sx={{
          '& .MuiSelect-select.MuiInputBase-input': {
            color: appColorTheme.name === 'Dark theme' ? '#FFFFFF' : '#000000',
            display: 'flex',
            alignItems: 'center',
            gap: '5px',
          },
          '& .MuiSvgIcon-root.MuiSelect-icon': {
            fill: appColorTheme.name === 'Dark theme' ? '#FFFFFF' : '#000000',
          },
          '& .MuiInputBase-root.MuiInput-root.MuiSelect-root:after ': {
            borderBottom: `2px solid ${appColorTheme.secondaryColor}`,
          },
        }}
      >
        <MenuItem value=''>
          <em>None</em>
        </MenuItem>
        {name === 'category'
          ? Object.keys(transactionCategories).map((eachCategory) => [
              <ListSubheader
                key={eachCategory}
                sx={{
                  background: appColorTheme.secondaryColor,
                  color: appColorTheme.lightColor,
                  fontWeight: 600,
                  fontSize: 18,
                }}
              >
                {eachCategory}
              </ListSubheader>,
              ...transactionCategories[eachCategory].map((eachSubCategory) => (
                <MenuItem
                  value={`${eachCategory}-${eachSubCategory.name}`}
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: '5px',
                    color: appColorTheme.secondaryColor,
                  }}
                  key={`${eachCategory}-${eachSubCategory.name}`}
                >
                  {eachSubCategory.icon}
                  <p className='categoryPara'>{eachSubCategory.name}</p>
                </MenuItem>
              )),
            ])
          : menuItems.map((eachPayment) => (
              <MenuItem value={eachPayment} key={eachPayment}>
                {eachPayment}
              </MenuItem>
            ))}
      </Select>
    </FormControl>
  );
};

export default CustomSelect;
