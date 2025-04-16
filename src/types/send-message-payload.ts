export type SendMessagePayload = {
  tenantId: number;
  senderId: number;
  conversationId: number;
  webhookConversationId: string;
  webhookMessageId?: string;
  text: string;
  attachment?: Buffer;
};
