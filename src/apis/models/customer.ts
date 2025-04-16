import { BaseModel } from "./base";

export interface CustomerModel extends BaseModel {
  fullName: string;
  email: string | null;
  phone: string | null;
  avatar: string | null;
  status: string;
  tags: Tag[];
  notes: string | null;
  tenantId: number;
  externalId: string;
  channelId: number;
  lastActivity: string | null;
}

type Tag = {
  name: string;
  color: string;
};
