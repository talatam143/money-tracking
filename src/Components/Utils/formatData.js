import { bankData, cardsData, upiData } from '../Constant Data/Data';
import bankImage from '../../Assets/Images/bank.png';
import creditImage from '../../Assets/Images/credit.png';
import upiImage from '../../Assets/Images/upi.png';

export const formatpaymentInformation = (data) => {
  const tempData = {};
  if (data?.bankDetails) {
    let bankDetails = data?.bankDetails.map((eachBank) => {
      let filteredData = bankData.filter((eachData) => eachData.title === eachBank);
      if (filteredData.length > 0) {
        return { name: eachBank, imageUrl: filteredData[0].imageUrl };
      } else {
        return { name: eachBank, imageUrl: bankImage, noImage: true };
      }
    });
    tempData.bankDetails = bankDetails;
  }
  if (data?.creditCards) {
    let creditCardsDetails = data?.creditCards.map((eachCredit) => {
      let filteredData = cardsData.filter((eachData) => eachData.title === eachCredit);
      if (filteredData.length > 0) {
        return { name: eachCredit, imageUrl: filteredData[0].imageUrl };
      } else {
        return { name: eachCredit, imageUrl: creditImage, noImage: true };
      }
    });
    tempData.creditCardsDetails = creditCardsDetails;
  }
  if (data?.upiDetails) {
    let upiDetails = data?.upiDetails.map((eachUPI) => {
      let filteredData = upiData.filter((eachData) => eachData.title === eachUPI);
      if (filteredData.length > 0) {
        return { name: eachUPI, imageUrl: filteredData[0].imageUrl };
      } else {
        return { name: eachUPI, imageUrl: upiImage, noImage: true };
      }
    });
    tempData.upiDetails = upiDetails;
  }
  return tempData;
};
