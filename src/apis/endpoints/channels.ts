import { AxiosRequestConfig } from "axios";
import useLazyGetApi from "../methods/lazy-get";
import { ChannelModel } from "../models/channel";

export default function ChannelsEndpoint() {
  const index = useLazyGetApi<ChannelModel[], AxiosRequestConfig>({
    endpoint: "/channels",
    key: ["CHANNELS"],
  });
  return { index };
}
