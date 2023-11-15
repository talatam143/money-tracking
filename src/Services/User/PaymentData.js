var serverUrl = `${process.env.REACT_APP_SERVER_URL}user`;

export const userPaymentDataHandler = async (servicetype, payload, apiPath, apiMethod) => {
  const token = localStorage.getItem('userId');
  try {
    var requestOptions = {
      method: apiMethod,
      headers: { authorization: `bearer ${token}`, 'Content-Type': 'application/json' },
      redirect: 'follow',
    };

    var formattedData = {};
    if (servicetype === 'updatePaymentDetails') {
      if (payload?.bankDetails?.length > 0) {
        formattedData.bankDetails = payload.bankDetails;
      }
      if (payload?.upiDetails?.length > 0) {
        formattedData.upiDetails = payload.upiDetails;
      }
      if (payload?.creditCardsDetails?.length > 0) {
        formattedData.ccDetails = payload.creditCardsDetails;
      }
    } else if (servicetype === 'forceUpdateDetails') {
      if (payload?.bankDetails) {
        formattedData.bankDetails = payload.bankDetails;
      }
      if (payload?.upiDetails) {
        formattedData.upiDetails = payload.upiDetails;
      }
      if (payload?.creditCardsDetails) {
        formattedData.ccDetails = payload.creditCardsDetails;
      }
    }
    if (apiMethod !== 'GET') requestOptions.body = JSON.stringify(formattedData);

    var apiResponse = await fetch(`${serverUrl}${apiPath}`, requestOptions);
    const responseData = await apiResponse.json();
    return { status: apiResponse.status, data: responseData.data };
  } catch (error) {
    window.location.href = '/error';
    return { status: 404, data: { errorMessage: 'Something went wrong' } };
  }
};
