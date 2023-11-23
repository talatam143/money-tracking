import { Box, Paper, Stack, Typography } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import { transactionCategories, paymentMethod } from '../Constant Data/Data';
import { IconBuildingBank, IconDotsCircleHorizontal, IconStar } from '@tabler/icons-react';

const NormalView = (props) => {
  const { data, lastTransactionElementRef } = props;
  const appColorTheme = useSelector((state) => state.colorState);

  return (
    <Stack flexDirection='row' flexWrap='wrap' gap={1} sx={{ margin: '10px' }}>
      {data.map((eachTransaction, index) => (
        <Paper
          ref={data.length === index + 1 ? lastTransactionElementRef : null}
          key={eachTransaction._id}
          sx={{
            background: appColorTheme.lightColor,
            width: '100%',
            boxSizing: 'border-box',
            flexGrow: '1',
            borderRadius: '4px',
            padding: '10px',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Stack flexDirection='row' flexWrap='wrap' justifyContent='space-between'>
            <Stack flexDirection='row' flexWrap='wrap' alignItems='center' gap={1.5}>
              <Paper
                sx={{
                  background: 'transparent',
                  textAlign: 'center',
                  color: appColorTheme.secondaryColor,
                  borderRadius: '4px',
                  padding: '0 10px',
                  fontWeight: 600,
                  fontSize: '17px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                {new Intl.DateTimeFormat('en', { month: 'short' }).format(
                  new Date(eachTransaction.transaction_date),
                )}
                <br />
                {new Date(eachTransaction.transaction_date).getDate()}
              </Paper>
              <Paper
                sx={{
                  color: appColorTheme.secondaryColorColor,
                  margin: '0',
                  padding: 0,
                  borderRadius: '4px',
                  background:
                    appColorTheme.name !== 'Dark theme' ? appColorTheme.backgroundColor : null,
                  alignSelf: 'stretch',
                }}
              >
                {
                  transactionCategories?.[eachTransaction?.category?.split('-')[0]]?.find(
                    (eachCategory) =>
                      eachCategory.name === eachTransaction?.category?.split('-')[1],
                  )?.mediumIcon
                }
              </Paper>
              <Box>
                <Typography
                  sx={{
                    color: appColorTheme.secondaryColor,
                    fontWeight: 600,
                    fontSize: '18px',
                    lineHeight: '1.4',
                  }}
                >
                  {eachTransaction.title}
                </Typography>
                <Typography
                  sx={{
                    color: appColorTheme.secondaryColor,
                    fontWeight: 500,
                    fontSize: '17px',
                  }}
                >
                  &#8377;{eachTransaction.amount}
                </Typography>
              </Box>
            </Stack>
            <IconDotsCircleHorizontal size={30} style={{ cursor: 'pointer' }} />
          </Stack>
          {eachTransaction?.payment_method || eachTransaction?.bank ? (
            <Stack
              flexDirection='row'
              gap={0.5}
              alignItems='center'
              justifyContent='space-between'
              mt={2}
              fontSize={16}
              fontWeight={500}
              color={appColorTheme.lightColor}
              width='100%'
            >
              {eachTransaction?.payment_method ? (
                <Paper
                  sx={{
                    background: appColorTheme.secondaryColor,
                    borderRadius: '4px',
                    color: appColorTheme.lightColor,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    padding: '3px 5px',
                  }}
                >
                  {paymentMethod[eachTransaction.payment_method].icon}
                  {eachTransaction.payment_method}
                </Paper>
              ) : null}
              {eachTransaction?.bank ? (
                <Paper
                  sx={{
                    background: appColorTheme.secondaryColor,
                    borderRadius: '4px',
                    color: appColorTheme.lightColor,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    padding: '3px 5px',
                  }}
                >
                  <IconBuildingBank />
                  {eachTransaction.bank}
                </Paper>
              ) : null}
              {eachTransaction?.starred ? <IconStar fill='#ffe700' color='#ffe700' /> : null}
            </Stack>
          ) : null}
        </Paper>
      ))}
    </Stack>
  );
};

export default NormalView;
