import { AttachmentModel } from "../apis/models/attachment";

type Props = { attachment: AttachmentModel; continerClassName?: string };

const Attachment = ({ attachment, continerClassName }: Props) => {
  return (
    <div className={continerClassName}>
      <img src={attachment.url} className="w-full" alt="" />
    </div>
  );
};

export default Attachment;
