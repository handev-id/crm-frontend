import usePostApi from "../methods/post";

export default function ChannelIntegrationsEndpoint() {
  const telegram = usePostApi<unknown, { token: string }>({
    endpoint: "/channel-integrations/telegram",
    key: ["TELEGRAM_INTEGRATION"],
  });

  return { telegram };
}
