var serverUrl = process.env.REACT_APP_SERVER_URL;

export const updatePaymentDetails = async (payload) => {
  const token = localStorage.getItem('userId');
  try {
    var formattedData = {};
    if (payload?.bankDetails?.length > 0) {
      formattedData.bankDetails = payload.bankDetails;
    }
    if (payload?.upiDetails?.length > 0) {
      formattedData.upiDetails = payload.upiDetails;
    }
    if (payload?.creditCardsDetails?.length > 0) {
      formattedData.ccDetails = payload.creditCardsDetails;
    }

    var raw = JSON.stringify(formattedData);
    var requestOptions = {
      method: 'PUT',
      headers: { authorization: `bearer ${token}`, 'Content-Type': 'application/json' },
      body: raw,
      redirect: 'follow',
    };
    var response = await fetch(`${serverUrl}user/updatealldetails`, requestOptions);
    const data = await response.json();
    return { status: response.status, data: data.data };
  } catch (error) {
    window.location.href = '/error';
    return { status: 404, data: { errorMessage: 'Something went wrong' } };
  }
};

export const forceUpdateDetails = async (payload) => {
  const token = localStorage.getItem('userId');
  try {
    var formattedData = {};
    if (payload?.bankDetails) {
      formattedData.bankDetails = payload.bankDetails;
    }
    if (payload?.upiDetails) {
      formattedData.upiDetails = payload.upiDetails;
    }
    if (payload?.creditCardsDetails) {
      formattedData.ccDetails = payload.creditCardsDetails;
    }

    var raw = JSON.stringify(formattedData);
    var requestOptions = {
      method: 'PUT',
      headers: { authorization: `bearer ${token}`, 'Content-Type': 'application/json' },
      body: raw,
      redirect: 'follow',
    };
    var response = await fetch(`${serverUrl}user/forceupdate`, requestOptions);
    const data = await response.json();
    return { status: response.status, data };
  } catch (error) {
    window.location.href = '/error';
    return { status: 404, data: { errorMessage: 'Something went wrong' } };
  }
};

export const getUserDetails = async () => {
  const token = localStorage.getItem('userId');
  try {
    var requestOptions = {
      method: 'GET',
      headers: { authorization: `bearer ${token}`, 'Content-Type': 'application/json' },
      redirect: 'follow',
    };
    var response = await fetch(`${serverUrl}user/getuserdetails`, requestOptions);
    const data = await response.json();
    return { status: response.status, data: data };
  } catch (error) {
    window.location.href = '/error';
    return { status: 404, data: { errorMessage: 'Something went wrong' } };
  }
};
