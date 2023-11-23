import React, { useState, useRef, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTransactions } from '../../Services/Transactions/Transactions';
import { Box } from '@mui/material';

import TransactionsFilterBar from './TransactionsFilterBar';
import CompactView from './CompactView';
import { resetState, setSuccessState } from '../../features/PageState/PageState';
import SkeletonLoader from '../Loader/Skeleton';
import { startSnackbar } from '../../features/SnackBar/SnackBar';
import NormalView from './NormalView';

export default function App() {
  const [viewOptions, setViewOptions] = useState('');
  const pageState = useSelector((state) => state.pageState);
  const [transactions, setTransactions] = useState([]);
  const [hasMore, setHasMore] = useState(false);
  const [pageNumber, setPageNumber] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(resetState());
    async function fetchData() {
      const { status, data } = await getTransactions(pageNumber);
      if (status === 200) {
        setTransactions((prevData) => [...prevData, ...data.transactions]);
        setHasMore(data.transactionsCount > pageNumber);
        dispatch(setSuccessState());
      } else {
        dispatch(startSnackbar({ message: data.errorMessage, severity: 'error' }));
      }
    }
    fetchData();
  }, [dispatch, pageNumber]);

  const observer = useRef();
  const lastBookElementRef = useCallback(
    (node) => {
      if (pageState.state === 'LOADING') return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPageNumber((prevPageNumber) => prevPageNumber + 20);
        }
      });
      if (node) observer.current.observe(node);
    },
    [pageState, hasMore],
  );

  const handleSortChange = (event) => {
    setViewOptions(event.target.value);
  };

  const View = () => {
    switch (viewOptions) {
      case 'Compact':
        return <CompactView data={transactions} lastTransactionElementRef={lastBookElementRef} />;
      case 'Normal':
        return <NormalView data={transactions} lastTransactionElementRef={lastBookElementRef} />;
      default:
        return <CompactView data={transactions} lastTransactionElementRef={lastBookElementRef} />;
    }
  };

  return (
    <Box>
      <TransactionsFilterBar viewOptions={viewOptions} handleSortChange={handleSortChange} />
      <View />
      {pageState.state === 'LOADING' ? <SkeletonLoader pageType='TRANSACTIONS' /> : null}
    </Box>
  );
}
