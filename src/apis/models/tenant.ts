import { AttachmentModel } from "./attachment";
import { BaseModel } from "./base";
import { UserModel } from "./user";

export interface TenantModel extends BaseModel {
  name: string;
  type: string;
  email: string | null;
  phone: string | null;
  logo: AttachmentModel | null;
  address: string | null;
  description: string | null;
  users?: UserModel[];
}
