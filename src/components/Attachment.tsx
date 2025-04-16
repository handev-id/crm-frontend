import { useEffect, useRef, useState } from "react";
import { MessageModel } from "../apis/models/message";
import { FaRegFilePdf } from "react-icons/fa";

const Attachment = ({ message }: { message: MessageModel }) => {
  const attachmentRef = useRef<HTMLImageElement | HTMLVideoElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.1,
      }
    );

    if (attachmentRef.current) {
      observer.observe(attachmentRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  const renderAttachment = () => {
    if (!message?.attachment) return null;

    const commonStyle = {
      width: message.attachment?.width || "100%",
      maxWidth: "100%",
      height: message.attachment?.height || "auto",
      maxHeight: "200px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    };

    if (message?.attachment?.type?.includes("image")) {
      return (
        <div style={commonStyle}>
          <img
            loading="lazy"
            ref={attachmentRef as React.RefObject<HTMLImageElement>}
            className="object-cover h-full w-full rounded-lg"
            src={isVisible ? message.attachment.url : undefined}
            alt="Attachment"
          />
        </div>
      );
    }

    if (message?.attachment?.type?.includes("video")) {
      return (
        <div style={commonStyle}>
          <video
            ref={attachmentRef as React.RefObject<HTMLVideoElement>}
            controls={isVisible}
            className="object-contain h-full w-full rounded-lg"
          >
            {isVisible && (
              <source src={message.attachment.url} type="video/mp4" />
            )}
            Your browser does not support the video tag.
          </video>
        </div>
      );
    }

    if (message?.attachment?.type?.includes("application")) {
      return (
        <a target="_blank" href={message?.attachment?.url}>
          <div
            style={{
              ...commonStyle,
            }}
          >
            <FaRegFilePdf className="text-3xl text-red-600" />
            <p>{message?.attachment?.name}</p>
          </div>
        </a>
      );
    }

    return null;
  };

  return renderAttachment();
};

export default Attachment;
