import { AttachmentModel } from "../apis/models/attachment";

export type SendMessagePayload = {
  tenantId: number;
  senderId: number;
  conversationId: number;
  webhookConversationId: string;
  text: string;
  channelId: number;
  replyWebhookMessageId?: number;
  attachment?: AttachmentModel;
};
