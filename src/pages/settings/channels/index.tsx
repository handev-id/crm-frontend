import Tab, { TabGroup } from "../../../components/Tab";
import { useState } from "react";
import { channelsMap } from "../../../utils/constant";
import Whatsapp from "./whatsapp";
import Telegram from "./telegram";

const Channels = () => {
  const [currentChannel, setCurrentChannel] = useState("Whatsapp");

  return (
    <div className="space-y-4">
      <div className="cn-box-base">
        <div className="flex justify-between items-center">
          <TabGroup>
            {Object.entries(channelsMap).map(([channel]) => (
              <Tab
                key={channel}
                onClick={() => setCurrentChannel(channel)}
                isActive={channel === currentChannel}
              >
                {channel}
              </Tab>
            ))}
          </TabGroup>
          <div></div>
        </div>
      </div>
      <div className="cn-box-base">
        {currentChannel === "Whatsapp" ? (
          <Whatsapp />
        ) : currentChannel === "Telegram" ? (
          <Telegram />
        ) : null}
      </div>
    </div>
  );
};

export default Channels;
