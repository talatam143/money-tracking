import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

export const DashbaordIcon = (props) => {
  let classString = props.isSelected
    ? 'icon icon-tabler icon-tabler-layout-dashboard filledDashboardIcon'
    : 'icon icon-tabler icon-tabler-layout-dashboard outlinedDashboardIcon';
  const appColorTheme = useSelector((state) => state.colorState);
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      className={classString}
      viewBox='0 0 24 24'
      strokeWidth='2'
      stroke={
        appColorTheme.name === 'Dark theme' && !props.isSelected
          ? appColorTheme.lightColor
          : 'currentColor'
      }
      fill='none'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <path stroke='none' d='M0 0h24v24H0z' fill='none'></path>
      <path d='M4 4h6v8h-6z'></path>
      <path d='M4 16h6v4h-6z'></path>
      <path d='M14 12h6v8h-6z'></path>
      <path d='M14 4h6v4h-6z'></path>
    </svg>
  );
};

export const TransactionsIcon = (props) => {
  let classString = props.isSelected
    ? 'icon icon-tabler icon-tabler-clipboard-text filledTransactionIcon'
    : 'icon icon-tabler icon-tabler-clipboard-text outlinedTransactionIcon';
  const appColorTheme = useSelector((state) => state.colorState);
  const [strokeColor, setStrokeColor] = useState('currentColor');

  useEffect(() => {
    if (props.isSelected) {
      setStrokeColor(appColorTheme.backgroundColor);
    } else if (appColorTheme.name === 'Dark theme') {
      setStrokeColor(appColorTheme.lightColor);
    } else if (appColorTheme.name !== 'Dark theme') {
      setStrokeColor('currentColor');
    }
  }, [appColorTheme, props.isSelected]);

  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      className={classString}
      viewBox='0 0 24 24'
      strokeWidth='2'
      stroke={appColorTheme.name === 'Dark theme' && !props.isSelected ? '#d1c4e9' : 'currentColor'}
      fill='none'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <path stroke='none' d='M0 0h24v24H0z'></path>
      <path
        d='M9 5h-2a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-12a2 2 0 0 0 -2 -2h-2'
        fill={props.isSelected ? 'currentColor' : 'none'}
        stroke={props.isSelected ? 'none' : strokeColor}
      ></path>
      <path
        d='M9 3m0 2a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v0a2 2 0 0 1 -2 2h-2a2 2 0 0 1 -2 -2z'
        fill={props.isSelected ? appColorTheme.backgroundColor : 'none'}
      ></path>
      <path d='M9 12h6' stroke={strokeColor}></path>
      <path d='M9 16h6' stroke={strokeColor}></path>
    </svg>
  );
};

export const UserAccountIcon = (props) => {
  let classString = props.isSelected
    ? 'icon icon-tabler icon-tabler-user-square-rounded filledAccountIcon'
    : 'icon icon-tabler icon-tabler-user-square-rounded outlinedAccountIcon';
  const appColorTheme = useSelector((state) => state.colorState);
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      className={classString}
      viewBox='0 0 24 24'
      strokeWidth='2'
      stroke={
        appColorTheme.name === 'Dark theme' && !props.isSelected
          ? appColorTheme.lightColor
          : 'currentColor'
      }
      fill='none'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <path stroke='none' d='M0 0h24v24H0z' fill='none'></path>
      <path
        d='M12 13a3 3 0 1 0 0 -6a3 3 0 0 0 0 6z'
        fill={props?.isSelected ? 'currentColor' : 'none'}
      ></path>
      <path d='M12 3c7.2 0 9 1.8 9 9s-1.8 9 -9 9s-9 -1.8 -9 -9s1.8 -9 9 -9z'></path>
      <path
        d='M6 20.05v-.05a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v.05'
        fill={props?.isSelected ? 'currentColor' : 'none'}
      ></path>
    </svg>
  );
};

export const AddIcon = () => {
  const appColorTheme = useSelector((state) => state.colorState);
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      className='icon icon-tabler icon-tabler-plus'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      strokeWidth='2.5'
      stroke='currentColor'
      fill={appColorTheme.secondaryColor}
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <path stroke='none' d='M0 0h24v24H0z' fill='none'></path>
      <path d='M12 5l0 14'></path>
      <path d='M5 12l14 0'></path>
    </svg>
  );
};

export const SearchIcon = () => {
  const appColorTheme = useSelector((state) => state.colorState);
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      className='icon icon-tabler icon-tabler-search'
      width='22'
      height='22'
      viewBox='0 0 24 24'
      strokeWidth='2.5'
      stroke={appColorTheme.secondaryColor}
      fill='none'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <path stroke='none' d='M0 0h24v24H0z' fill='none'></path>
      <path d='M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0'></path>
      <path d='M21 21l-6 -6'></path>
    </svg>
  );
};

export const DownDirection = () => {
  const appColorTheme = useSelector((state) => state.colorState);
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      className='icon icon-tabler icon-tabler-adjustments-alt'
      width='26'
      height='26'
      viewBox='0 0 24 24'
      strokeWidth='2'
      stroke={appColorTheme.secondaryColor}
      fill='none'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <path stroke='none' d='M0 0h24v24H0z' fill='none'></path>
      <path d='M4 8h4v4h-4z'></path>
      <path d='M6 4l0 4'></path>
      <path d='M6 12l0 8'></path>
      <path d='M10 14h4v4h-4z'></path>
      <path d='M12 4l0 10'></path>
      <path d='M12 18l0 2'></path>
      <path d='M16 5h4v4h-4z'></path>
      <path d='M18 4l0 1'></path>
      <path d='M18 9l0 11'></path>
    </svg>
  );
};

export const CloseIcon = () => {
  const appColorTheme = useSelector((state) => state.colorState);
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      className='icon icon-tabler icon-tabler-x'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      strokeWidth='2.2'
      stroke={appColorTheme.secondaryColor}
      fill='none'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <path stroke='none' d='M0 0h24v24H0z' fill='none'></path>
      <path d='M18 6l-12 12'></path>
      <path d='M6 6l12 12'></path>
    </svg>
  );
};

export const UserName = () => {
  const appColorTheme = useSelector((state) => state.colorState);
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      className='icon icon-tabler icon-tabler-id'
      width='28'
      height='28'
      viewBox='0 0 24 24'
      strokeWidth='1.5'
      stroke={appColorTheme.lightColor}
      fill='none'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <path stroke='none' d='M0 0h24v24H0z' fill='none'></path>
      <path
        d='M3 4m0 3a3 3 0 0 1 3 -3h12a3 3 0 0 1 3 3v10a3 3 0 0 1 -3 3h-12a3 3 0 0 1 -3 -3z'
        fill={appColorTheme.secondaryColor}
        stroke={appColorTheme.secondaryColor}
      ></path>
      <path d='M9 10m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0'></path>
      <path d='M15 8l2 0'></path>
      <path d='M15 12l2 0'></path>
      <path d='M7 16l10 0'></path>
    </svg>
  );
};

export const UserEmail = () => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      className='icon icon-tabler icon-tabler-mail-filled'
      width='26'
      height='26'
      viewBox='0 0 24 24'
      strokeWidth='1'
      stroke='currentColor'
      fill='none'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <path stroke='none' d='M0 0h24v24H0z' fill='none'></path>
      <path
        d='M22 7.535v9.465a3 3 0 0 1 -2.824 2.995l-.176 .005h-14a3 3 0 0 1 -2.995 -2.824l-.005 -.176v-9.465l9.445 6.297l.116 .066a1 1 0 0 0 .878 0l.116 -.066l9.445 -6.297z'
        strokeWidth='0'
        fill='currentColor'
      ></path>
      <path
        d='M19 4c1.08 0 2.027 .57 2.555 1.427l-9.555 6.37l-9.555 -6.37a2.999 2.999 0 0 1 2.354 -1.42l.201 -.007h14z'
        strokeWidth='0'
        fill='currentColor'
      ></path>
    </svg>
  );
};

export const UserPhone = () => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      className='icon icon-tabler icon-tabler-phone-filled'
      width='26'
      height='26'
      viewBox='0 0 24 24'
      strokeWidth='1'
      stroke='currentColor'
      fill='none'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <path stroke='none' d='M0 0h24v24H0z' fill='none'></path>
      <path
        d='M9 3a1 1 0 0 1 .877 .519l.051 .11l2 5a1 1 0 0 1 -.313 1.16l-.1 .068l-1.674 1.004l.063 .103a10 10 0 0 0 3.132 3.132l.102 .062l1.005 -1.672a1 1 0 0 1 1.113 -.453l.115 .039l5 2a1 1 0 0 1 .622 .807l.007 .121v4c0 1.657 -1.343 3 -3.06 2.998c-8.579 -.521 -15.418 -7.36 -15.94 -15.998a3 3 0 0 1 2.824 -2.995l.176 -.005h4z'
        strokeWidth='0'
        fill='currentColor'
      ></path>
    </svg>
  );
};

export const UserCardAcountIcon = (props) => {
  const appColorTheme = useSelector((state) => state.colorState);
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      className='icon icon-tabler icon-tabler-user-square'
      width='72'
      height='72'
      viewBox='0 0 24 24'
      strokeWidth='1.6'
      stroke='currentColor'
      fill='none'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <path stroke='none' d='M0 0h24v24H0z' fill='none' />
      <path d='M8 10a3 3 0 1 0 6 0a3 3 0 0 0 -6 0' fill={appColorTheme.secondaryColor} />
      <path d='M5 21v-1a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v1' fill={appColorTheme.secondaryColor} />
      <path d='M3 5a2 2 0 0 1 1 -2h13a2 2 0 0 1 2 2v14a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-14z' />
    </svg>
  );
};

export const BankIcon = () => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      className='icon icon-tabler icon-tabler-building-bank'
      width='28'
      height='28'
      viewBox='0 0 24 20'
      strokeWidth='2'
      stroke='currentColor'
      fill='none'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <path stroke='none' d='M0 0h24v24H0z' fill='none'></path>
      <path d='M3 21l18 0'></path>
      <path d='M3 10l18 0'></path>
      <path d='M5 6l7 -3l7 3'></path>
      <path d='M4 10l0 11'></path>
      <path d='M20 10l0 11'></path>
      <path d='M8 14l0 3'></path>
      <path d='M12 14l0 3'></path>
      <path d='M16 14l0 3'></path>
    </svg>
  );
};

export const CreditCardIcon = () => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      className='icon icon-tabler icon-tabler-cards'
      width='28'
      height='28'
      viewBox='0 0 24 20'
      strokeWidth='2'
      stroke='currentColor'
      fill='none'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <path stroke='none' d='M0 0h24v24H0z' fill='none'></path>
      <path d='M3.604 7.197l7.138 -3.109a.96 .96 0 0 1 1.27 .527l4.924 11.902a1 1 0 0 1 -.514 1.304l-7.137 3.109a.96 .96 0 0 1 -1.271 -.527l-4.924 -11.903a1 1 0 0 1 .514 -1.304z'></path>
      <path d='M15 4h1a1 1 0 0 1 1 1v3.5'></path>
      <path d='M20 6c.264 .112 .52 .217 .768 .315a1 1 0 0 1 .53 1.311l-2.298 5.374'></path>
    </svg>
  );
};

export const PayPalIcon = () => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      className='icon icon-tabler icon-tabler-brand-paypal'
      width='28'
      height='28'
      viewBox='0 0 24 20'
      strokeWidth='2'
      stroke='currentColor'
      fill='none'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <path stroke='none' d='M0 0h24v24H0z' fill='none'></path>
      <path d='M10 13l2.5 0c2.5 0 5 -2.5 5 -5c0 -3 -1.9 -5 -5 -5h-5.5c-.5 0 -1 .5 -1 1l-2 14c0 .5 .5 1 1 1h2.8l1.2 -5c.1 -.6 .4 -1 1 -1zm7.5 -5.8c1.7 1 2.5 2.8 2.5 4.8c0 2.5 -2.5 4.5 -5 4.5h-2.6l-.6 3.6a1 1 0 0 1 -1 .8l-2.7 0a.5 .5 0 0 1 -.5 -.6l.2 -1.4'></path>
    </svg>
  );
};

export const EditButton = () => {
  const appColorTheme = useSelector((state) => state.colorState);
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      className='icon icon-tabler icon-tabler-edit'
      width='22'
      height='22'
      viewBox='0 0 24 22'
      strokeWidth='1.8'
      stroke={appColorTheme.secondaryColor}
      fill='none'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <path stroke='none' d='M0 0h24v24H0z' fill='none' />
      <path d='M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1' />
      <path d='M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z' />
      <path d='M16 5l3 3' />
    </svg>
  );
};
