import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createPortal } from "react-dom";
import { RootState } from "../../utils/store";
import { closeConfirm } from "../../utils/store/slices/confirm";
import Button from "../button/Button";

export default function ConfirmModal() {
  const dispatch = useDispatch();
  const control = useSelector((state: RootState) => state.confirm);
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [loading, setLoading] = useState(false);
  const modalRef = useRef<HTMLDivElement | null>(null);

  const handleClose = () => {
    dispatch(closeConfirm({ isOpen: false }));
  };

  const handleConfirm = async () => {
    setLoading(true);
    try {
      await control.onConfirm?.();
      handleClose();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleClickOutsideModal = (event: React.MouseEvent<HTMLDivElement>) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      handleClose();
    }
  };

  useEffect(() => {
    if (control.isOpen) {
      setIsVisible(true);
      setTimeout(() => setIsAnimating(true), 100);
    } else {
      setIsAnimating(false);
      setTimeout(() => {
        setIsVisible(false);
      }, 500);
    }
  }, [control.isOpen]);

  if (!isVisible) return null;

  return createPortal(
    <>
      <div
        onClick={() => handleClose()}
        className={`bg-[#111]/60 fixed top-0 left-0 w-full h-full z-40 transition-opacity duration-300 ${
          isAnimating ? "opacity-100" : "opacity-0"
        }`}
      ></div>

      <div
        ref={modalRef}
        onClick={handleClickOutsideModal}
        className={`shadow-lg cursor-default rounded-md z-50 shadow-3 fixed top-1/2 left-1/2 -translate-x-1/2 transition-all duration-300 ${
          isAnimating
            ? "opacity-100 scale-100 translate-y-[-50%]"
            : "opacity-0 scale-90 translate-y-[-45%]"
        }`}
      >
        <div className="bg-white dark:bg-neutralDark rounded-lg shadow-lg p-4 md:py-6 md:px-10">
          <h2 className="mb-5 text-lg text-center font-semibold dark:text-neutral">
            {control.title || "Konfirmasi"}
          </h2>
          <p className="mb-5 text-center">{control.message}</p>
          <div className="flex justify-center gap-4">
            <Button onClick={() => handleClose()} coloring="danger">
              {control.cancelText || "Batal"}
            </Button>
            <Button loading={loading} onClick={() => handleConfirm()}>
              {control.confirmText || "Ya"}
            </Button>
          </div>
        </div>
      </div>
    </>,
    document.body
  );
}
