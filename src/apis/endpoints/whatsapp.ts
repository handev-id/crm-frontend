import { WaEvent } from "../../types/wa-events";
import useLazyGetApi from "../methods/lazy-get";
import usePostApi from "../methods/post";

export default class WhatsappEndpoint {
  getStatus;
  restart;

  constructor() {
    this.getStatus = useLazyGetApi<WaEvent["connection"], number>({
      endpoint: (id) => `/whatsapp/status/${id}`,
      key: "WHATSAPP_STATUS",
    });

    this.restart = usePostApi<WaEvent["connection"], number>({
      endpoint: (id) => `/whatsapp/status/${id}`,
      key: "WHATSAPP_RESTART",
    });
  }
}
