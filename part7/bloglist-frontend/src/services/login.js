import axios from 'axios';
const baseUrl = '/api/login';

const login = async (creds) => {
  try {
    const response = await axios.post(baseUrl, creds);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export default { login };
