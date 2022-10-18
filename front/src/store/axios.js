import axios from "axios";

const instance = axios.create({
  // baseURL: "http://192.168.43.191:3002/",
  baseURL: "http://localhost:3002/",
});


export default instance;
