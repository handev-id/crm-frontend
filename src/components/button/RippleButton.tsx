import React, { HTMLProps, useRef } from "react";

type Props = {
  children: React.ReactNode;
  className?: string;
  ripleColor?: string;
};

export function RippleButton({
  children,
  className,
  ripleColor,
  type = "button",
  ...props
}: Props & HTMLProps<HTMLButtonElement>) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const rippleRef = useRef<HTMLSpanElement>(null);

  function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
    const button = buttonRef.current;
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
    <button
      {...props}
      ref={buttonRef}
      onClick={(e) => {
        handleClick(e);
        props.onClick?.(e);
      }}
      className={`myButton font-semibold ${className}`}
    >
      {children}
      <span ref={rippleRef} className={`rippleEffect ${ripleColor}`}></span>
    </button>
  );
}
