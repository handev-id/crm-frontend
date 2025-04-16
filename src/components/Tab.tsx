import { HTMLProps } from "react";

const Tab = ({
  children,
  isActive,
  ...props
}: {
  children: React.ReactNode;
  isActive?: boolean;
} & HTMLProps<HTMLDivElement>) => {
  return (
    <div
      {...props}
      className={`py-4 px-3 border-b-2 text-neutralDark dark:text-neutral duration-300 ${
        isActive
          ? "text-primary dark:text-primaryDark border-primary dark:border-primaryDark"
          : "text-neutralDark hover:border-primary dark:hover:border-primaryDark border-transparent dark:text"
      }`}
    >
      <span>{children}</span>
    </div>
  );
};

export default Tab;

export const TabGroup = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={`flex cursor-pointer ${
        className || ""
      } items-center w-full overflow-x-scroll scrollbar-hidden text-sm font-semibold`}
    >
      {children}
    </div>
  );
};
