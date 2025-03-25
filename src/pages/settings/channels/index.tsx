import Tab, { TabGroup } from "../../../components/Tab";
import { useState } from "react";
import { channelsMap } from "../../../utils/common";
import Whatsapp from "./whatsapp";

const Channels = () => {
  const [currentChannel, setCurrentChannel] = useState("Whatsapp");

  return (
    <div className="space-y-4 lg:pb-28">
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
        </div>
      </div>
      <div className="cn-box-base">
        <Whatsapp />
      </div>
    </div>
  );
};

export default Channels;
