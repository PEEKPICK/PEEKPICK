import axios from "axios";

// export const customAxios = axios.create({
//   // baseURL: "https://i9b309.p.ssafy.io/api",
//   // baseURL: "http://localhost:8081",
// });

export const customAxios = axios.create({
  baseURL: "https://i9b309.p.ssafy.io/api",
  // baseURL: "http://localhost:8081",
  headers: {
    Authorization:
      "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhdXRoIiwiYXZhdGFySWQiOiIxNiIsInByb3ZpZGVyIjoibm9uZSIsImV4cCI6MTY5MTM4MjU5MSwiaWF0IjoxNjkxMjk2MTkxLCJtZW1iZXJJZCI6IjEwIn0.nmgpwBMd04M01XgiSniqn_UHHLNarw5Oz3aOGPz4NiV91uNxcfSY5e_zQYgxN3aSTCNS4YdgowyOQvgQJKutBw",
  },
});

export const authAxios = axios.create({
  baseURL: "https://i9b309.p.ssafy.io/api",
});
