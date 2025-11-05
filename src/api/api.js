import axios from "axios";

const api = axios.create({
  // baseURL: "https://82.112.230.130/api/v1", 
  baseURL: "https://lms.prodchunca.in.net/api/v1", 
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;



