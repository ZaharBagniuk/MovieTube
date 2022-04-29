import axios from "axios";

export const KEY = "251e8e9e47e44eddef1cf3e04d19caab";

export default axios.create({
    baseURL: `https://api.themoviedb.org/3`
});
