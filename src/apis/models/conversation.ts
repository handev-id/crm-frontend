export type ConversationModel = {
  id: string;
  firstName: string;
  lastName: string;
  phone: string;
  avatar: string;
  lastChat: string;
  createdAt: string;
  updatedAt: string;
  tags: Tag[];
};

export type Tag = {
  id: string;
  name: string;
  color: string;
  createdAt: string;
  updatedAt: string;
};
