import axios from 'axios';
import config from './confic';

// Function to set the access token in the request headers
const setAccessToken = (accessToken: string) => {
  axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
};

// Function to make API requests with error handling
const makeRequest = async (
  method: 'get' | 'post' | 'put' | 'delete',
  url: string,
  data: any = null
) => {
  try {
    const response = await axios[method](`${config.backendURL}${url}`, data);
    return response.data;
  } catch (error: any) {
    if (error.response) {
      // The request was made, but the server responded with an error status code
      console.error('API Error:', error.response.data);
      throw new Error(
        error.response.data.message || 'An error occurred while processing your request.'
      );
    } else if (error.request) {
      // The request was made, but no response was received
      console.error('API Error:', error.request);
      throw new Error('No response received from the server.');
    } else {
      // Something else happened while setting up the request
      console.error('API Error:', error.message);
      throw new Error('An error occurred while setting up the request.');
    }
  }
};

export { setAccessToken, makeRequest };
