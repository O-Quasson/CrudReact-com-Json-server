import axios from "axios";

const api = axios.get({
    baseURL: "https://easy-points-talk.loca.lt"
});

// const api = axios.create({
//     baseURL: "https://fuzzy-hounds-rule.loca.lt",
// });

export default api;