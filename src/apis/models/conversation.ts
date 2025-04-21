import { BaseModel } from "./base";
import { ChannelModel } from "./channel";
import { CustomerModel } from "./customer";
import { MessageModel } from "./message";
import { UserModel } from "./user";

export interface ConversationModel extends BaseModel {
  customerId: number;
  agentId: number | null;
  webhookConversationId: string;
  channelId: number;
  customer: CustomerModel;
  agent: UserModel | null;
  channel: ChannelModel;
  lastMessage: MessageModel;
  unreadCount: number;
}
