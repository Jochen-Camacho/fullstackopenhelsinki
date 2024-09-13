import axios from 'axios';
const baseUrl = '/api/blogs';

let token = '';

const getAll = async () => {
  try {
    const request = axios.get(baseUrl);
    const response = await request;
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const create = async (blogObj) => {
  try {
    const config = {
      headers: { Authorization: token },
    };
    const response = await axios.post(baseUrl, blogObj, config);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const update = async (blogObj) => {
  try {
    const response = await axios.put(`${baseUrl}/${blogObj.id}`, blogObj);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const deleteBlog = async (blogId) => {
  try {
    const config = {
      headers: { Authorization: token },
    };
    const response = await axios.delete(`${baseUrl}/${blogId}`, config);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const addComment = async (content, id) => {
  try {
    const config = {
      headers: { Authorization: token },
    };
    const response = await axios.post(
      `${baseUrl}/${id}/comments`,
      { content },
      config
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export default { getAll, setToken, create, update, deleteBlog, addComment };
