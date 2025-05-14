import Tab, { TabGroup } from "../../../components/Tab";
import { useSelector } from "react-redux";
import { RootState } from "../../../utils/store";
import { useState } from "react";
import Telegram from "./telegram";
import Website from "./website";

const Channels = () => {
  const [currentChannel, setCurrentChannel] = useState("website");
  const { channels } = useSelector((state: RootState) => state.channels);

  return (
    <div className="space-y-4">
      <div className="cn-box-base">
        <div className="flex justify-between items-center">
          <TabGroup>
            {(channels || []).map((channel) => (
              <Tab
                key={channel.id}
                onClick={() => setCurrentChannel(channel.name)}
                isActive={channel.name === currentChannel}
              >
                {channel.name}
              </Tab>
            ))}
          </TabGroup>
          <div></div>
        </div>
      </div>
      <div className="cn-box-base">
        {currentChannel === "website" ? (
          <Website />
        ) : currentChannel === "whatsapp" ? (
          <div></div>
        ) : currentChannel === "telegram" ? (
          <Telegram />
        ) : null}
      </div>
    </div>
  );
};

export default Channels;
