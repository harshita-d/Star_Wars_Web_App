import axios from "axios";

const axiosHelper = axios.create({
  baseURL: process.env.REACT_APP_URL,
});

export default axiosHelper;
