import { Skeleton, Stack } from '@mui/material';
import React from 'react';

const SkeletonLoader = (props) => {
  const { pageType } = props;

  const SkeletonType = () => {
    switch (pageType) {
      case 'ACCOUNT':
        return (
          <Stack sx={{ width: '100%', mt: 1 }} gap={2} alignItems='center'>
            <Skeleton
              variant='circular'
              width={80}
              height={80}
              sx={{ alignSelf: 'start', ml: 1 }}
            />
            <Skeleton variant='rounded' width='95%' height={140} />

            <Skeleton variant='rounded' width='95%' height={45} animation='wave' />
            <Skeleton variant='rounded' width='95%' height={45} />
            <Skeleton variant='rounded' width='95%' height={45} animation='wave' />
            <Skeleton variant='rounded' width='95%' height={45} sx={{ mt: 10 }} />
          </Stack>
        );

      case 'HOME':
        break;
      case 'TRANSACTIONS':
        break;

      default:
        break;
    }
  };

  return (
    <>
      <SkeletonType />
    </>
  );
};

export default SkeletonLoader;