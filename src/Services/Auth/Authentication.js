const serverUrl = `${process.env.REACT_APP_SERVER_URL}auth`;

export const authServiceHandler = async (servicetype, formData, apiPath, apiMethod) => {
  const token = localStorage.getItem('userId');
  try {
    var requestOptions = {
      method: apiMethod,
      headers: { authorization: `bearer ${token}`, 'Content-Type': 'application/json' },
      redirect: 'follow',
    };
    if (apiMethod !== 'GET') requestOptions.body = JSON.stringify(formData);
    var apiResponse = await fetch(`${serverUrl}${apiPath}`, requestOptions);
    var responseData = await apiResponse.json();
    return { status: apiResponse.status, data: responseData.data };
  } catch (error) {
    if (servicetype === 'authenticateUser') localStorage.clear();
    window.location.href = '/error';
    return { status: 404, data: { errorMessage: 'Something went wrong' } };
  }
};
