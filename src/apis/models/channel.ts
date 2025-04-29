import { AttachmentModel } from "./attachment";
import { BaseModel } from "./base";

export interface ChannelModel extends BaseModel {
  name: string;
  logo: AttachmentModel | null;
}
