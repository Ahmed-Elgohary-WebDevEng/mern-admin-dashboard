import axios from "axios";

const sendRequest = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  // withCredentials: true
})

export default sendRequest