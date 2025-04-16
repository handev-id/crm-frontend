import { axiosInstance } from "../apis/axios";

const Test = () => {
  const handleLogin = async () => {
    const { data } = await axiosInstance.get("/channels/tiktok");
    window.location.href = data.url;
  };

  return <div onClick={handleLogin}>Test</div>;
};

export default Test;
