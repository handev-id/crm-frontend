import { useSelector } from "react-redux";
import Form from "./form";
import Header from "./header";
import { RootState } from "../../../utils/store";
import Message from "../../../components/Message";

const Room = () => {
  const { theme } = useSelector((state: RootState) => state.theme);
  return (
    <div className="h-screen bg-white dark:bg-Dark pb-10 flex flex-col justify-between">
      <Header />
      <div className="h-full pt-2 px-2 pb-4 scrollbar w-full overflow-y-auto">
        {Array.from({ length: 2 }, (_, index) => (
          <Message key={index}
            text="Hello"
            theme={theme}
            position={index === 0 ? "left" : "right"}
          />
        ))}
      </div>
      <div className="mt-auto">
        <Form />
      </div>
    </div>
  );
};

export default Room;
