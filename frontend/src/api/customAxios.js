import axios from "axios";

// export const customAxios = axios.create({
//   // baseURL: "http://192.168.31.27:8081",
//   baseURL: "http://localhost:8081",
// });

export const customAxios = axios.create({
  baseURL: "http://172.30.1.21:8081",
  // baseURL: "http://localhost:8081",
  headers: {
    Authorization:
      "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhdXRoIiwiYXZhdGFySWQiOiIxNiIsInByb3ZpZGVyIjoibm9uZSIsImV4cCI6MTY5MTIzNjQ1MCwiaWF0IjoxNjkxMTUwMDUwLCJtZW1iZXJJZCI6IjEwIn0._tJK0w-EF193xqWTj2AolKkpwdydkIysVV-qV7udwMivY1aWhxVLyAPTmYxhGr55ZwPuJ3DelapX1q3Z7iMyQw",
  },
});
