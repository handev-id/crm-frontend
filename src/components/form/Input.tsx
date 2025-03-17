import {
  forwardRef,
  HTMLProps,
  LegacyRef,
  Ref,
  useImperativeHandle,
  useRef,
} from "react";
import PositionedContainer from "../PositionedContainer";

type Props = {
  leftItem?: JSX.Element;
  rightItem?: JSX.Element;
};

const Input = forwardRef(
  (
    { leftItem, rightItem, ...props }: Props & HTMLProps<HTMLInputElement>,
    ref: Ref<HTMLInputElement | undefined>
  ) => {
    const inputRef = useRef<HTMLInputElement>();

    useImperativeHandle(ref, () => inputRef.current, []);

    return (
      <PositionedContainer
        items={leftItem || rightItem}
        className="dark:text-neutral text-Dark/70 text-2xl"
        positioning={leftItem ? "top-3.5 left-3" : "top-3.5 right-3"}
      >
        <input
          style={{
            paddingLeft: leftItem ? "48px" : "8px",
            paddingRight: rightItem ? "48px" : "8px",
          }}
          {...props}
          ref={inputRef as LegacyRef<HTMLInputElement>}
          className="bg-neutral dark:text text-Dark dark:bg-neutralDark pr-3 py-3.5 w-full rounded-lg placeholder:opacity-100 outline-none hover:bg-neutralHover/80 dark:hover:bg-neutralHoverDark placeholder:text-gray-600"
        />
      </PositionedContainer>
    );
  }
);

export default Input;
