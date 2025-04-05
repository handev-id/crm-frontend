import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useSelector } from "react-redux";
import { RootState } from "../utils/store";

type Props = {
  type: "user-list" | "list" | "avatar";
  height?: string;
};

const SkeletonComponent = ({ type, height = "50px" }: Props) => {
  const {isDarkMode} = useSelector((state: RootState) => state.theme)
  return (
    <SkeletonTheme baseColor={isDarkMode ? "#202020" : ""} highlightColor={isDarkMode ? "#444" : ""}>
      {type === "avatar" ? (
        <Skeleton
          circle
          style={{
            width: "60px",
            height: "60px",
          }}
          className="dark:bg-gray-600" // dark mode background
        />
      ) : type === "user-list" ? (
        <div className="grid grid-cols-[60px_1fr] items-center gap-2 w-full">
          <Skeleton
            circle
            style={{
              width: "50px",
              height: "50px",
            }}
          />
          <Skeleton
            style={{
              width: "100%",
              height,
            }}
          />
        </div>
      ) : (
        <Skeleton
          style={{
            width: "100%",
            height,
          }}
          className="dark:bg-gray-600" // dark mode background
        />
      )}
    </SkeletonTheme>
  );
};

export default SkeletonComponent;
