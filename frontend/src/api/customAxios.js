import axios from 'axios';

export const customAxios = axios.create({
  baseURL: "http://192.168.31.26:8081",
});