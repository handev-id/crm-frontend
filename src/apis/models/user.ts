import { BaseModel } from "./base";

export interface UserModel extends BaseModel {
  fullName: string;
  email: string;
  phone: string;
  gender: "male" | "female";
  password: string;
  avatar: string;
  token?: string;
  role: string;
}
