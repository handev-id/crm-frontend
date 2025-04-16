import { AxiosRequestConfig } from "axios";
import useLazyGetApi from "../methods/lazy-get";
import { MessageModel } from "../models/message";
import { MetaData } from "../../types/meta-data";

export default function MessagesEndpoint() {
  const index = useLazyGetApi<
    { meta: MetaData; data: MessageModel[] },
    AxiosRequestConfig
  >({
    endpoint: "/messages",
    key: ["MESSAGES"],
  });
  return { index };
}
