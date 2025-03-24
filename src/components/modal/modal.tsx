import { useEffect, useRef, useState } from "react";
import { ModalParams } from "./use-modal";
import { createPortal } from "react-dom";

export default function Modal<T>({
  children,
  title,
  control,
  onClose = () => {},
}: ModalParams<T>) {
  const [mount, setMount] = useState(false);
  const modalRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!control.isOpen && mount) {
      onClose();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [control.isOpen]);

  const handleClickOutsideModal = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      control.close();
    }
  };

  useEffect(() => {
    setMount(true);
  }, []);

  if (!control.isOpen) return null;

  return (
    <>
      {createPortal(
        <>
          <div
            onClick={control.close}
            className="bg-[#111]/60 fixed top-0 cursor-default left-0 w-full h-full z-40"
          ></div>
          <div
            ref={modalRef}
            onClick={handleClickOutsideModal}
            className="shadow-lg cursor-default rounded-md z-50 shadow-3 fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2"
          >
            <div className="bg-white dark:bg-neutralDark rounded-lg shadow-lg py-8 px-10">
              <h2 className="mb-5 text-lg text-center font-semibold dark:text-neutral">
                {title}
              </h2>
              {children}
            </div>
          </div>
        </>,
        document.body
      )}
    </>
  );
}
