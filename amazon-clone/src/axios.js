import axios from "axios";

const instance = axios.create({
    baseURL: 'http://localhost:5001/challenge-92c0d/us-central1/api' 
});

export default instance;