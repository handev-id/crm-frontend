import { AxiosRequestConfig } from "axios";
import { MetaData } from "../../types/meta-data";
import useLazyGetApi from "../methods/lazy-get";
import { ConversationModel } from "../models/conversation";

export default function ConversationsEndpoint() {
  const index = useLazyGetApi<
    { meta: MetaData; data: ConversationModel[] },
    AxiosRequestConfig
  >({
    endpoint: "/conversations",
    key: ["CONVERSATIONS"],
  });

  return { index };
}
