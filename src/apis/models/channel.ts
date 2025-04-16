import { BaseModel } from "./base";

export interface ChannelModel extends BaseModel {
  name: string;
  logo: string | null;
}
