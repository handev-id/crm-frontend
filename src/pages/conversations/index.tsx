import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../utils/store";
import { setIsMobile, setIsOpen } from "../../utils/store/slices/drawer";
import Resizable from "../../components/Resizble";
import OfflineMessage from "../../components/OfflineMessage";
import Detail from "./detail";
import Room from "./room";
import Drawer from "./drawer";

export default function Conversations() {
  const dispatch = useDispatch();
  const { isOpen } = useSelector((state: RootState) => state.drawer);
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  if (!isOnline) return <OfflineMessage />;

  useEffect(() => {
    if (window.innerWidth > 1024) {
      dispatch(setIsOpen(true));
      dispatch(setIsMobile(false));
    } else {
      dispatch(setIsMobile(true));
    }
  }, []);

  return (
    <>
      {window.innerWidth >= 1024 ? (
        <div>
          <Resizable
            leftContent={<Drawer />}
            middleContent={<Room />}
            rightContent={<Detail />}
          />
        </div>
      ) : (
        <div className="flex overflow-x-hidden">
          {/* <div
            className={
              isOpen
                ? "w-full duration-300 absolute left-0 top-0 z-20"
                : "w-full duration-300 absolute left-[-100%] top-0 z-10"
            }
          >
          </div> */}
          <Drawer />
          {/* <div className={"w-full"}>
            <Room />
          </div> */}
        </div>
      )}
    </>
  );
}
