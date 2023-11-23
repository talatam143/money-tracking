import { Paper, Stack, Typography } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import { transactionCategories } from '../Constant Data/Data';

const CompactView = (props) => {
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
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Stack flexDirection='row' flexWrap='wrap' alignItems='center' gap={1}>
            <Typography
              sx={{
                textAlign: 'center',
                color: appColorTheme.secondaryColor,
                fontWeight: 600,
                fontSize: '17px',
                lineHeight: 1.2,
                width: '35px',
              }}
            >
              {new Intl.DateTimeFormat('en', { month: 'short' }).format(
                new Date(eachTransaction.transaction_date),
              )}
              <br />
              {new Date(eachTransaction.transaction_date).getDate()}
            </Typography>
            <Paper
              sx={{
                margin: '0',
                padding: 0,
                borderRadius: '4px',
                background:
                  appColorTheme.name !== 'Dark theme' ? appColorTheme.secondaryColor : null,
                color: appColorTheme.name !== 'Dark theme' ? appColorTheme.lightColor : null,
                alignSelf: 'stretch',
                width: '38px',
                height: '45px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {
                transactionCategories?.[eachTransaction?.category?.split('-')[0]]?.find(
                  (eachCategory) => eachCategory.name === eachTransaction?.category?.split('-')[1],
                )?.smallIcon
              }
            </Paper>
            <Typography
              sx={{
                color: appColorTheme.secondaryColor,
                fontWeight: 600,
                fontSize: '18px',
                lineHeight: '1',
              }}
            >
              {eachTransaction.title}
            </Typography>
          </Stack>

          <Typography
            sx={{
              color: appColorTheme.secondaryColor,
              fontWeight: 500,
              fontSize: '16px',
              lineHeight: '1',
            }}
          >
            &#8377;{eachTransaction.amount}
          </Typography>
        </Paper>
      ))}
    </Stack>
  );
};

export default CompactView;
