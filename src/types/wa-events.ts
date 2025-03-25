export type WaEvent = {
  connection: {
    id: string;
    status: {
      connection: "CONNECTING" | "DISCONNECTED" | "CONNECTED";
      qr?: string;
    };
  };
};
