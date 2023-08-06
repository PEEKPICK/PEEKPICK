import axios from "axios";

// export const customAxios = axios.create({
//   // baseURL: "https://i9b309.p.ssafy.io/api",
//   // baseURL: "http://localhost:8081",
// });

export const customAxios = axios.create({
  baseURL: "https://i9b309.p.ssafy.io/api",
  // baseURL: "http://localhost:8081",
  headers: {
    Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
  },
});

export const authAxios = axios.create({
  baseURL: "https://i9b309.p.ssafy.io/api",
});
