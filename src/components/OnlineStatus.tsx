import React, { useState, useEffect } from "react";

function OnlineStatus() {
  const [online, setOnline] = useState(true);

  return (
    <span className="text-neutralDark dark:text-neutralHover text-sm mx-3">
      {online ? "Connected" : "Connecting..."}
    </span>
  );
}

export default OnlineStatus;
