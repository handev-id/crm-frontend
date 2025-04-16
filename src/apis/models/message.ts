import { AttachmentModel } from "./attachment";
import { BaseModel } from "./base";
import { CustomerModel } from "./customer";
import { UserModel } from "./user";

export interface MessageModel extends BaseModel {
  text: string;
  attachment: AttachmentModel | null;
  sender: CustomerModel | UserModel;
  senderType: "customer" | "user";
  webhookMessageId: number;
}
