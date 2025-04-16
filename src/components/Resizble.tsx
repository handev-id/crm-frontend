import React from "react";
import { useDispatch } from "react-redux";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import { setWidth } from "../utils/store/slices/drawer";

const Resizable = ({
  leftContent,
  rightContent,
}: {
  leftContent: React.ReactNode;
  rightContent?: React.ReactNode;
}) => {
  const dispatch = useDispatch();

  return (
    <PanelGroup direction="horizontal">
      <Panel
        onResize={(size) => dispatch(setWidth(Math.round(size)))}
        defaultSize={30}
      >
        {leftContent}
      </Panel>
      {rightContent && (
        <>
          {/* <PanelResizeHandle
            className={
              "hover:bg-primary dark:hover:bg-primaryDark active:bg-primary dark:active:bg-primaryDark w-[5px]"
            }
          /> */}
          <Panel defaultSize={60}>{rightContent}</Panel>
        </>
      )}
    </PanelGroup>
  );
};

export default Resizable;
