import useDeleteApi from "../methods/delete";
import useGetApi from "../methods/get";
import usePostApi from "../methods/post";
import { AiAgentModel } from "../models/ai-agent";

export default function AiAgentEndpoint() {
  const index = useGetApi<AiAgentModel[]>({
    endpoint: "/ai-agent",
    key: ["AI_AGENTS"],
  });

  const upsert = usePostApi<AiAgentModel, AiAgentModel>({
    endpoint: "/ai-agent",
    key: ["AI_AGENT_UPSERT"],
  });

  const destroy = useDeleteApi<AiAgentModel, { id: number }>({
    endpoint: (data) => "/ai-agent/" + data.id,
    key: ["AI_AGENT_DESTROY"],
  });

  return {
    index,
    upsert,
    destroy,
  };
}
