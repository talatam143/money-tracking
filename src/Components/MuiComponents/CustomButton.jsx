import { IconPlus } from '@tabler/icons-react';
import React from 'react';
import { useSelector } from 'react-redux';

const CustomButton = (props) => {
  const { handleClick } = props;
  const appColorTheme = useSelector((state) => state.colorState);

  return (
    <button
      type='button'
      style={{
        border: 'none',
        background: appColorTheme.secondaryColor,
        color: '#FFFFFF',
        borderRadius: '3px 6px 6px 3px',
        cursor: 'pointer',
      }}
      onClick={handleClick}
    >
      <IconPlus />
    </button>
  );
};

export default CustomButton;
