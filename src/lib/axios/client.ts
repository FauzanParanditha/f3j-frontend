import axios from "axios";

const clientAxios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_CLIENT_API_URL,
  withCredentials: true,
  timeout: 30000,
});

export default clientAxios;
