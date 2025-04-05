import { HTMLProps, useRef } from "react";

type Props = {
  children: React.ReactNode;
  className?: string;
};

export default function RippleEffect({
  children,
  className,
  ...props
}: Props & HTMLProps<HTMLDivElement>) {
  const divRef = useRef<HTMLDivElement>(null);
  const rippleRef = useRef<HTMLSpanElement>(null);

  function handleClick(event: React.MouseEvent<HTMLDivElement>) {
    const button = divRef.current;
    const ripple = rippleRef.current;
    const buttonRect = button!.getBoundingClientRect();
    const { left, top } = buttonRect;
    const leftPosition = event.clientX - left;
    const topPosition = event.clientY - top;

    ripple!.style!.left = leftPosition + "px";
    ripple!.style.top = topPosition + "px";

    ripple!.classList.add("active");

    setTimeout(() => {
      ripple!.classList.remove("active");
    }, 600);
  }

  return (
    <div
      {...props}
      ref={divRef}
      onClick={(e) => {
        handleClick(e);
        props.onClick?.(e);
      }}
      className={`myRipple ${className}`}
    >
      {children}
      <span ref={rippleRef} className={`rippleEffect bg-black/30 dark:bg-white/30`}></span>
    </div>
  );
}
