var serverUrl = process.env.REACT_APP_SERVER_URL;

export const authenticateUser = async () => {
  const token = localStorage.getItem('userId');
  var payload = {};
  try {
    var requestOptions = {
      method: 'GET',
      headers: { authorization: `bearer ${token}` },
      redirect: 'follow',
    };
    var response = await fetch(`${serverUrl}auth`, requestOptions);
    payload.status = response.status;
    payload.data = await response.json();
    return payload;
  } catch (error) {
    window.location.href = '/error';
    payload.status = 404;
    return payload;
  }
};

export const signUp = async (formData) => {
  try {
    var requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    };
    const response = await fetch(`${serverUrl}auth/signup`, requestOptions);
    const data = await response.json();
    return { status: response.status, data: data.data };
  } catch (error) {
    window.location.href = '/error';
    return { status: 404, data: { errorMessage: 'Something went wrong' } };
  }
};

export const signIn = async (formData) => {
  try {
    var requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    };
    const response = await fetch(`${serverUrl}auth/login`, requestOptions);
    const data = await response.json();
    return { status: response.status, data: data.data };
  } catch (error) {
    window.location.href = '/error';
    return { status: 404, data: { errorMessage: 'Something went wrong' } };
  }
};
