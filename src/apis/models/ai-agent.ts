import { AiContentList } from "../../types/ai-content";
import { AttachmentModel } from "./attachment";
import { BaseModel } from "./base";
import { TenantModel } from "./tenant";

export interface AiAgentModel extends BaseModel {
  name: string;
  welcomeMessage: string;
  instruction: string;
  avatar?: File | AttachmentModel | null;
  status: "active" | "inactive";
  histories: AiContentList[];
  channelIds: number[];
  tenantId: number;
  tenant: TenantModel;
}
