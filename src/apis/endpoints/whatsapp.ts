import { WaEvent } from "../../types/wa-events";
import useLazyGetApi from "../methods/lazy-get";
import usePostApi from "../methods/post";

export default function WhatsappEndpoint() {
  const getStatus = useLazyGetApi<WaEvent["connection"], { id: number }>({
    endpoint: (payload) => `/whatsapp/status/${payload.id}`,
    key: "WHATSAPP_STATUS",
  });

  const restart = usePostApi<WaEvent["connection"], { id: number }>({
    endpoint: (payload) => `/whatsapp/restart/${payload.id}`,
    key: "WHATSAPP_RESTART",
  });

  return { getStatus, restart };
}
