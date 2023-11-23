import { Skeleton, Stack } from '@mui/material';
import React from 'react';

const SkeletonLoader = (props) => {
  const { pageType } = props;

  const SkeletonType = () => {
    switch (pageType) {
      case 'ACCOUNT':
        return (
          <Stack sx={{ width: '100%', mt: 1 }} gap={2} alignItems='center'>
            <Skeleton variant='rounded' width='95%' height={45} animation='wave' />
            <Skeleton variant='rounded' width='95%' height={45} />
            <Skeleton variant='rounded' width='95%' height={45} animation='wave' />
          </Stack>
        );

      case 'HOME':
        break;
      case 'TRANSACTIONS':
        return (
          <Stack sx={{ width: '100%', mt: 1 }} gap={2} alignItems='center'>
            <Skeleton variant='rounded' width='95%' height={55} animation='wave' />
            <Skeleton variant='rounded' width='95%' height={55} />
            <Skeleton variant='rounded' width='95%' height={55} animation='wave' />
            <Skeleton variant='rounded' width='95%' height={55} />
            <Skeleton variant='rounded' width='95%' height={55} animation='wave' />
            <Skeleton variant='rounded' width='95%' height={55} />
            <Skeleton variant='rounded' width='95%' height={55} animation='wave' />
          </Stack>
        );
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
