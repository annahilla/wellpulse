import { useEffect, useRef } from "react";

interface ModalProps {
  isOpen: boolean;
  closeModal: () => void;
  children: React.ReactNode
}

const Modal = ({
  isOpen,
  closeModal,
  children
}: ModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        closeModal();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [closeModal]);

  return (
    isOpen && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div
          ref={modalRef}
          className="bg-white p-20 w-1/2 rounded-xl flex flex-col items-center justify-center"
        >
          { children }
        </div>
      </div>
    )
  );
};

export default Modal;