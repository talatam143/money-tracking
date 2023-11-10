import { bankData, cardsData, upiData } from '../Constant Data/Data';

export const paymentMetaData = {
  bankDetails: {
    id: 'bankDetails',
    inputLabel: 'Select Bank',
    buttonLabel: 'Add Bank',
    data: bankData,
  },
  creditCardsDetails: {
    id: 'creditCardsDetails',
    inputLabel: 'Select Credit Cards',
    buttonLabel: 'Add Credit Card',
    data: cardsData,
  },
  upiDetails: { id: 'upiDetails', inputLabel: 'Select UPI', buttonLabel: 'Add UPI', data: upiData },
};
