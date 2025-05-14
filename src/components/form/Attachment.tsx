import { useDropzone } from "react-dropzone";
import { GLOBAL_ICONS } from "../../utils/icons";
import { CustomButton } from "../button/CustomButton";
import { AttachmentModel } from "../../apis/models/attachment";
import { useEffect, useState } from "react";
import { FaRegFilePdf } from "react-icons/fa";
import { convertFileToBuffer } from "../../utils/helpers";

type Props = {
  value: AttachmentModel | undefined;
  onChange: (file: AttachmentModel) => void;
};

const Attachment = ({ value, onChange }: Props) => {
  const [attachment, setAttachment] = useState<File | null>(null);

  const onDrop = async (acceptedFiles: File[]) => {
    if (acceptedFiles[0].size > 12 * 1024 * 1024) {
      alert("Ukuran maksimal file 12 MB!");
      return;
    }
    setAttachment(acceptedFiles[0]);
    onChange({
      name: acceptedFiles[0].name,
      size: acceptedFiles[0].size,
      type: acceptedFiles[0].type,
      url: URL.createObjectURL(acceptedFiles[0]),
      fileBuffer: await convertFileToBuffer(acceptedFiles[0]),
    });
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    multiple: false,
  });

  useEffect(() => {
    if (attachment) {
      onChange(attachment);
    }
  }, [attachment]);

  return (
    <div className="relative inline-block">
      {attachment && value && (
        <div className="absolute flex items-center flex-wrap gap-2 border border-base bottom-full mb-6 -left-[20px] p-3 shadow-lg w-56 rounded-xl bg-white dark:bg-neutralDark z-50">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setAttachment(null);
            }}
            className="h-7 w-7 absolute top-1 right-1 z-[5] flex justify-center items-center dark:bg-neutralDark border border-base hover:bg-neutral bg-white cursor-pointer rounded-full dark:hover:bg-neutralHoverDark"
          >
            {GLOBAL_ICONS.closeX}
          </button>
          {attachment.type?.includes("image") ? (
            <img
              loading="lazy"
              src={URL.createObjectURL(attachment)}
              className="object-contain max-w-full max-h-[250px] mx-auto"
              alt="Preview"
            />
          ) : attachment.type?.includes("video") ? (
            <video
              controls
              className="object-contain max-w-full max-h-[250px] mx-auto"
            >
              <source
                src={URL.createObjectURL(attachment)}
                type={attachment.type}
              />
              Your browser does not support the video tag.
            </video>
          ) : (
            <div className="flex items-center gap-2">
              <FaRegFilePdf className="text-3xl text-red-600" />
              <p className="text-sm opacity-70 font-light">{attachment.name}</p>
            </div>
          )}
        </div>
      )}

      {/* Upload Button */}
      <CustomButton
        {...getRootProps()}
        ripleColor="bg-black/30 dark:bg-white/30"
        className="p-3 text-xl text-Dark dark:text-neutral hover:bg-neutral dark:bg-neutralDark rounded-lg dark:hover:bg-neutralHoverDark"
      >
        {GLOBAL_ICONS.imagePlus}
      </CustomButton>
      <input {...getInputProps()} />
    </div>
  );
};

export default Attachment;
