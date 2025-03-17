import React from "react";

interface ChatBubbleProps {
  position?: "left" | "right";
  theme?: "light" | "dark";
  text: string;
}

const Message: React.FC<ChatBubbleProps> = ({
  position = "left",
  theme = "light",
  text,
}) => {
  return (
    <div
      className={
        theme === "light" ? "imessage text-sm" : "dark-imessage text-sm"
      }
    >
      <>
        <div className="m-0 p-0" />
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
          <div
            dangerouslySetInnerHTML={{
              __html: text,
            }}
          />
        </p>
      </>
    </div>
  );
};

export default Message;
