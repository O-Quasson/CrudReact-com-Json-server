import axios from "axios";

const api = axios.create({
    baseURL: "https://localhost:3000/people",
});

export default api;