import { HTMLProps, useRef } from "react";

type ButtonProps = {
  loading?: boolean;
  full?: boolean;
  containerClassName?: string;
  sizing?: keyof typeof sizingStyles;
  coloring?: keyof typeof coloringStyles;
  ripleColor?: keyof typeof ripleStyles;
};

const sizes = ["sm", "base", "fullSm", "fullBase"] as const;
const colors = ["primary", "danger", "neutral"] as const;
const ripleColors = ["white", "black", "red"] as const;

const sizingStyles: Record<(typeof sizes)[number], string> = {
  sm: "h-9 w-20 text-xs",
  base: "h-11 w-28 text-sm",
  fullSm: "w-full h-10 text-xs",
  fullBase: "w-full h-11 text-sm"
};

const coloringStyles: Record<(typeof colors)[number], string> = {
  primary: "bg-primary text-white",
  danger: "bg-danger text-white",
  neutral: "bg-neutral text-white",
};

const ripleStyles: Record<(typeof ripleColors)[number], string> = {
  white: "bg-white/70",
  black: "bg-black/30",
  red: "bg-danger/40",
};

const Button = ({
  loading,
  children,
  sizing = "base",
  coloring = "primary",
  type = "button",
  ripleColor = "white",
  containerClassName,
  ...props
}: ButtonProps & HTMLProps<HTMLButtonElement>) => {
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
      disabled={Boolean(props.disabled || loading)}
      className={`myButton rounded-lg font-semibold disabled:opacity-50 ${sizingStyles[sizing]} ${coloringStyles[coloring]}`}
    >
      {children}
      <span ref={rippleRef} className={`rippleEffect ${ripleStyles[ripleColor]}`}></span>
    </button>
  );
};

export default Button;
