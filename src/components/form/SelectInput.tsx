import React, { useEffect, useRef, useState } from "react";
import { CustomButton } from "../button/CustomButton";
import { FaChevronDown } from "react-icons/fa";

export type OptionType = {
  label: string;
  value: string;
};

type Props = {
  leftItems?: React.ReactNode[];
  options: OptionType[];
  onChange: (value: OptionType) => void;
  containerClassName?: string;
};

export default function Select({
  leftItems = [],
  onChange,
  options,
  containerClassName,
}: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<OptionType | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  const handleOptionClick = (option: OptionType) => {
    setSelectedOption(option);
    onChange(option);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        bodyRef.current?.scrollTo({ top: 0 });
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  return (
    <div ref={dropdownRef} className={`relative ${containerClassName}`}>
      <CustomButton
        onClick={toggleDropdown}
        ripleColor="bg-black/30 dark:bg-white/30"
        type="button"
        className={`bg-transparent h-10 py-2 shadow-none text-xs sm:text-sm w-full rounded-lg text-end text-neutralDark dark:text-neutralHover p-2.5 hover:bg-neutral dark:hover:bg-neutralDark hover:shadow-none`}
      >
        <div className="flex items-center">
          {leftItems.length > 0 && (
            <span className="text-lg">{leftItems[options.findIndex((opt) => opt === selectedOption)]}</span>
          )}
          <span className="ml-2">
            {selectedOption ? selectedOption.label : "Semua"} 
          </span>
          <FaChevronDown className="ml-auto" />
        </div>
      </CustomButton>

      <div
        ref={bodyRef}
        className={`origin-top-right w-full shadow-solid scrollbar overflow-y-auto absolute z-30 left-0 mt-1 rounded shadow-lg bg-white dark:bg-neutralDark transition-all duration-300 overflow-hidden ${
          isOpen ? "max-h-60 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div
          className="py-1"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="options-menu"
        >
          {options.map((option, idx) => (
            <button
              key={option.value}
              onClick={() => handleOptionClick(option)}
              className={`block w-full text-start px-4 py-3 text-sm font-semibold text-neutralDark dark:text-neutral hover:bg-neutral dark:hover:bg-Dark ${
                selectedOption === option
                  ? "bg-neutral dark:bg-neutralDark"
                  : ""
              }`}
              role="menuitem"
            >
              <div className="flex items-center gap-2">
                <span className="text-lg">{leftItems[idx]}</span>
                <p>{option.label}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
