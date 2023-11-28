export const sendRequest = async (data) => {
  const url = 'http://192.168.0.200:8080/query';
  const body = data;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error(`HTTP error ${response.status}`);
    }
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error('Error sending request:', error.message);
  }
};

export const sendRequestURL = async (methods, urls, data?: Object) => {
  const url = urls;
  const body = data;

  try {
    const response = await fetch(url, {
      method: methods,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error(`HTTP error ${response.status}`);
    }
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error('Error sending request:', error.message);
  }
};
