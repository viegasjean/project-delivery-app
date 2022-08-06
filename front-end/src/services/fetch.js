const url = 'http://localhost:3001';

async function fetchLogin(data) {
  try {
    const response = await fetch(`${url}/user/login`, {
      method: 'post',
      body: JSON.stringify(data),
    });
    const { status } = response;
    const responseData = await response.json();
    return { status, responseData };
  } catch (error) {
    const responseData = await response.json();
    return { responseData };
  }
}

async function fetchRegister(data) {
  try {
    const response = await fetch(`${url}/register`, {
      method: 'post',
      body: JSON.stringify(data),
    });
    const { status } = response;
    const responseData = await response.json();
    return { status, responseData };
  } catch (error) {
    const responseData = await response.json();
    return { responseData };
  }
}

module.exports = {
  fetchLogin,
  fetchRegister,
};
