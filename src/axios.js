import axios from "axios";

const instance = axios.create({
  baseURL: "https://react-chat-b4243.firebaseio.com/"
});

export default instance;
