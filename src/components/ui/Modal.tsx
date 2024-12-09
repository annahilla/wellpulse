import { useEffect, useRef } from "react";

const Modal = ({
  isOpen,
  closeModal,
  title,
  text,
}: {
  isOpen: boolean;
  closeModal: () => void;
  title: string;
  text: string;
}) => {
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
          <h5 className="font-bold text-2xl mb-8 text-center">{title}</h5>
          <p className="text-xl font-light">{text}</p>
        </div>
      </div>
    )
  );
};

export default Modal;