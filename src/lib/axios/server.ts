import axios from "axios";

const serverAxios = axios.create({
  baseURL: process.env.SERVER_API_URL,
  timeout: 30000,
});

export default serverAxios;
