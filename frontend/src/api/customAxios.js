import axios from "axios";

export const customAxios = axios.create({
  baseURL: "http://192.168.31.26:8081",
  // baseURL: "http://localhost:8081",
});

// export const customAxios = axios.create({
//   baseURL: "http://192.168.31.27:8081",
//   headers: {
//     Authorization:
//       "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhdXRoIiwiYXZhdGFySWQiOiIxNiIsInByb3ZpZGVyIjoibm9uZSIsImV4cCI6MTY5MTEyMjcyNywiaWF0IjoxNjkxMDM2MzI3fQ.y2RiuqB0gWnZolM8FWPV6HzLdEHaORT96pgiDwdJZy59H19ci2Vvs9oo7Qpr-PJTcm6B1PdbrizBVZScVutuaQ",
//   },
//   // baseURL: "http://localhost:8081",
// });
