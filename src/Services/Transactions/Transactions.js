const serverUrl = `${process.env.REACT_APP_SERVER_URL}`;

export const addTransaction = async (payload) => {
  const token = localStorage.getItem('userId');

  try {
    var raw = JSON.stringify(payload);
    var requestOptions = {
      method: 'POST',
      headers: { authorization: `bearer ${token}`, 'Content-Type': 'application/json' },
      redirect: 'follow',
      body: raw,
    };

    var apiResponse = await fetch(`${serverUrl}transaction/add`, requestOptions);
    var responseData = await apiResponse.json();
    return { status: apiResponse.status, data: responseData.data };
  } catch (error) {
    return { status: 404, data: { errorMessage: 'Something went wrong' } };
  }
};

export const getTransactions = async (skip) => {
  const token = localStorage.getItem('userId');
  try {
    var requestOptions = {
      method: 'GET',
      headers: {
        authorization: `bearer ${token}`,
        'Content-Type': 'application/json',
      },
      redirect: 'follow',
    };

    var apiResponse = await fetch(`${serverUrl}transaction?skip=${skip}`, requestOptions);
    var responseData = await apiResponse.json();
    return { status: apiResponse.status, data: responseData.data };
  } catch (error) {
    return { status: 404, data: { errorMessage: 'Something went wrong' } };
  }
};
