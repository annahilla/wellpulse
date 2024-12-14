import { useEffect, useRef } from "react";
import { IoMdClose } from "react-icons/io";

interface ModalProps {
  isOpen: boolean;
  closeModal: () => void;
  children: React.ReactNode;
}

const Modal = ({ isOpen, closeModal, children }: ModalProps) => {
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
          className="w-11/12 max-w-2xl relative bg-white p-10 rounded-xl flex flex-col items-center justify-start lg:w-1/2 max-h-[90vh] overflow-y-auto"
        >
          <button className="absolute right-5 top-5" onClick={closeModal}>
            <IoMdClose />
          </button>
          <div className="overflow-y-auto max-h-[calc(100vh-4rem)] w-full p-4">
            {children}
          </div>
        </div>
      </div>
    )
  );
};

export default Modal;
