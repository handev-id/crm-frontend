import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import { RootState } from "../utils/store";
import { setWidth } from "../utils/store/slices/drawer";

const Resizable = ({
  leftContent,
  middleContent,
  rightContent,
}: {
  leftContent: React.ReactNode;
  middleContent: React.ReactNode;
  rightContent: React.ReactNode;
}) => {
  const dispatch = useDispatch();
  const { width } = useSelector((state: RootState) => state.drawer);

  return (
    <PanelGroup direction="horizontal">
      <Panel
        onResize={(size) => dispatch(setWidth(Math.round(size)))}
        defaultSize={30}
      >
        {leftContent}
      </Panel>
      <PanelResizeHandle
        className={
          "hover:bg-primary dark:hover:bg-primaryDark active:bg-primary dark:active:bg-primaryDark w-[5px]"
        }
      />
      <Panel defaultSize={45}>{middleContent}</Panel>
      <PanelResizeHandle
        className={
          "hover:bg-primary dark:hover:bg-primaryDark active:bg-primary dark:active:bg-primaryDark w-[5px]"
        }
      />
      <Panel>{rightContent}</Panel>
    </PanelGroup>
  );
};

export default Resizable;
