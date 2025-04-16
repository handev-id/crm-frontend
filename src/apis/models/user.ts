import { RoleKey } from "../../types/roles";
import { AttachmentModel } from "./attachment";
import { BaseModel } from "./base";
import { TenantModel } from "./tenant";

export interface UserModel extends BaseModel {
  fullName: string;
  email: string;
  phone: string;
  gender: "male" | "female";
  password: string;
  avatar: File | AttachmentModel | null;
  token?: string;
  roles: RoleKey[];
  tenant?: TenantModel;
}
