import axios from 'axios';
const baseUrl = '/api/users';

const getAll = async () => {
  const r = await axios.get(baseUrl);
  return r.data;
};

export default { getAll };
