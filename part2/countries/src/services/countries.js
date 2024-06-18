import axios from "axios";
// const baseURL = "https://studies.cs.helsinki.fi/restcountries/";

const getCountries = () => {
  return axios.get(`https://studies.cs.helsinki.fi/restcountries/api/all`);
};

export default { getCountries };
