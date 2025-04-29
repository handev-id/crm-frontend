import Tab, { TabGroup } from "../../../components/Tab";
import { useSelector } from "react-redux";
import { RootState } from "../../../utils/store";
import { useState } from "react";
import Whatsapp from "./whatsapp";
import Telegram from "./telegram";

const Channels = () => {
  const [currentChannel, setCurrentChannel] = useState("whatsapp");
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
        {currentChannel === "whatsapp" ? (
          <Whatsapp />
        ) : currentChannel === "telegram" ? (
          <Telegram />
        ) : null}
      </div>
    </div>
  );
};

export default Channels;
