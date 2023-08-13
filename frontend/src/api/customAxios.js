import axios from "axios";

export const customAxios = axios.create({
  baseURL: "https://peekpick.online/api",
  headers: {
    Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
  },
});

export const authAxios = axios.create({
  baseURL: "https://peekpick.online/api",
});
