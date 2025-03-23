import Tab, { TabGroup } from "../../../components/Tab";
import { useState } from "react";
import { channelsMap } from "../../../utils/common";
import { QRCodeCanvas } from "qrcode.react";
import { GLOBAL_ICONS } from "../../../utils/icons";
import Button from "../../../components/button/Button";
import Whatsapp from "./whatsapp";

const Channels = () => {
  const [currentChannel, setCurrentChannel] = useState("Whatsapp");

  return (
    <div className="space-y-4">
      <div className="cn-box-base">
        <div className="flex justify-between items-center">
          <TabGroup>
            {Object.entries(channelsMap).map(([channel]) => (
              <Tab
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
