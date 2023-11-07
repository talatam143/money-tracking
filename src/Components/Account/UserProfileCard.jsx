import { Box } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';

import { UserCardAcountIcon, UserEmail, UserName, UserPhone } from '../../Assets/Icons/Icons';

const UserProfileCard = () => {
  const user = useSelector((state) => state.user);

  const userCardContainer = {
    hidden: { opacity: 1, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.1,
      },
    },
  };

  const usercardItems = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  return user.isUserLoggedIn ? (
    <motion.div
      className='userAccountDetailsContainer'
      variants={userCardContainer}
      initial='hidden'
      animate='visible'
    >
      <Box sx={{ padding: '10px 0 10px 10px' }}>
        <motion.p className='userCardPara' variants={usercardItems}>
          <UserName />
          {user.name}
        </motion.p>
        <motion.p className='userCardPara' variants={usercardItems}>
          <UserEmail />
          <span className='userEmailSpan'>{user.email}</span>
        </motion.p>
        <motion.p className='userCardPara' variants={usercardItems}>
          <UserPhone />
          {user.mobileNumber}
        </motion.p>
      </Box>
      <motion.div variants={usercardItems}>
        <UserCardAcountIcon />
      </motion.div>
    </motion.div>
  ) : null;
};

export default UserProfileCard;
