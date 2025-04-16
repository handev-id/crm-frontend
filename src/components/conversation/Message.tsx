import { CiClock2 } from "react-icons/ci";
import { MessageModel } from "../../apis/models/message";
import React from "react";
import Attachment from "../Attachment";
import moment from "moment";
import { GLOBAL_ICONS } from "../../utils/icons";

interface ChatBubbleProps {
  position?: "left" | "right";
  theme?: "light" | "dark";
  message: MessageModel;
}

const Message: React.FC<ChatBubbleProps> = ({
  position = "left",
  theme = "light",
  message,
}) => {
  return (
    <div>
      <div
        className={
          theme === "light" ? "imessage text-sm" : "dark-imessage text-sm"
        }
      >
        <>
          {/* <div className="m-0 p-0" /> */}
          <p
            className={
              theme === "light"
                ? `${
                    position === "left"
                      ? "from-them relative"
                      : "from-me relative"
                  }`
                : `${
                    position === "left"
                      ? "dark-from-them relative"
                      : "dark-from-me relative"
                  }`
            }
          >
            {message?.attachment && <Attachment message={message} />}
            {message?.text !== "[File]" && (
              <span className={message?.attachment ? "mt-2" : "m-0 p-0"}>
                {message.text}
              </span>
            )}
          </p>
        </>
      </div>
      <div
        className={`${
          position === "right" ? "justify-end" : "justify-start"
        } text-xs gap-2 text-neutralHoverDark/60 items-center mt-2 flex dark:text-neutralHover/60`}
      >
        <span>{message.sender.fullName}</span>
        <span className="-mx-1">•</span>
        <span>{moment(message.createdAt).format("HH:mm")}</span>
        {message.id === 0 && (
          <span className="text-[12px]">{GLOBAL_ICONS.clock}</span>
        )}
        {message.id !== 0 && message.senderType === "user" && (
          <span className="text-sm text-green-500">
            {GLOBAL_ICONS.checkOutline}
          </span>
        )}
      </div>
    </div>
  );
};

export default Message;
