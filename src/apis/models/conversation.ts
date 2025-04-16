import { BaseModel } from "./base";
import { ChannelModel } from "./channel";
import { CustomerModel } from "./customer";
import { MessageModel } from "./message";
import { UserModel } from "./user";

export interface ConversationModel extends BaseModel {
  lastMessage: MessageModel;
  customerId: number;
  agentId: number | null;
  webhookConversationId: string;
  channelId: number;
  createdAt: string;
  updatedAt: string;
  customer: CustomerModel;
  agent: UserModel | null;
  channel: ChannelModel;
}
