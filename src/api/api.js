// import axios from "axios";

// const api = axios.create({
//   // baseURL: "https://82.112.230.130/api/v1", 
//   baseURL: "https://lms.prodchunca.in.net/api/v1", 
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// export default api;


// import axios from "axios";

// const api = axios.create({
//   baseURL: "https://unadulterate-karlene-condensible.ngrok-free.dev/api/v1",
//   headers: {
//     "Content-Type": "application/json",
//     "Accept": "application/json",
//     "ngrok-skip-browser-warning": "true"   
//   },
//   timeout: 10000,
// });

// // Request interceptor
// api.interceptors.request.use(
//   (config) => {
//     console.log(`Making ${config.method?.toUpperCase()} request to:`, config.url);
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// // Response interceptor
// api.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     console.error("API Error:", error.response?.status, error.message);
//     return Promise.reject(error);
//   }
// );

// export default api;


import axios from "axios";

const api = axios.create({
  baseURL: "https://unadulterate-karlene-condensible.ngrok-free.dev/api/v1",
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json",
    "ngrok-skip-browser-warning": "true",
  },
  timeout: 10000,
});

// Add token automatically
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  console.log(`Making ${config.method?.toUpperCase()} request to:`, config.url);
  return config;
});


export default api;
