import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../utils/store";
import { setIsMobile, setIsOpen } from "../../utils/store/slices/drawer";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Resizable from "../../components/Resizble";
import Detail from "./detail";
import Room from "./room";
import Drawer from "./drawer";
import NoSelectedConversation from "../../components/NoSelectedConversation";
import { setActiveConversation } from "../../utils/store/slices/selected-message";

export default function ConversationsLayout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const pathName = useLocation().pathname;
  const { isOpen } = useSelector((state: RootState) => state.drawer);

  useEffect(() => {
    if (window.innerWidth > 1024) {
      dispatch(setIsOpen(true));
      dispatch(setIsMobile(false));
    } else {
      dispatch(setIsMobile(true));
    }

    return () => {
      dispatch(setActiveConversation(null));
    };
  }, []);

  return (
    <>
      {window.innerWidth >= 768 ? (
        <div>
          <Resizable
            leftContent={<Drawer />}
            rightContent={
              pathName === "/conversation" ? (
                <Room />
              ) : (
                <NoSelectedConversation />
              )
            }
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
