import Axios from "axios";

const AxiosClient = () => {
  const instance = Axios.create({ baseURL: "https://localhost:44374/api/" });
  return instance;
};

export default AxiosClient();
