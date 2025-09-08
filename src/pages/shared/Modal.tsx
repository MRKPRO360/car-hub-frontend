import { useEffect, useRef } from 'react';
import { startLenis, stopLenis } from '../../App';

import Cta from './Cta';
interface IModal {
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
  setIsConfirm: (isOpen: boolean) => void;
  text?: string;
}
const Modal = ({
  isModalOpen,
  setIsModalOpen,
  setIsConfirm,
  text = '',
}: IModal) => {
  const modalContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsModalOpen(false);
      }
    };
    if (isModalOpen) {
      document.addEventListener('keydown', handleEscape);
      stopLenis();
    } else {
      startLenis();
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isModalOpen, setIsModalOpen]);

  useEffect(() => {
    if (!isModalOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (
        modalContentRef.current &&
        !modalContentRef.current.contains(e.target as Node)
      ) {
        setIsModalOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isModalOpen, setIsModalOpen]);

  return (
    <div
      className={`${
        isModalOpen ? ' scale-[1] opacity-100' : ' scale-[0] opacity-0'
      } w-full h-screen fixed top-0 left-0 z-[200000000] bg-white/15 backdrop-blur-xs  flex items-center justify-center transition-all duration-300`}
    >
      <div
        ref={modalContentRef}
        className={`w-[85%] md:w-[60%] lg:max-w-[40%] bg-white/90 dark:bg-gray-950 rounded-lg drop-shadow-[0_8px_8px_rgba(37,99,235,0.1)] overflow-hidden hover:drop-shadow-[0_8px_4px_rgba(37,99,235,0.15)]  dark:hover:drop-shadow-[0_8px_16px_rgba(37,99,235,0.15)] transition duration-300  backdrop:blur-md dark:text-gray-300 px-4 py-6`}
      >
        <div className="space-y-1">
          <h2 className="text-xl">
            Are you sure about to delete {text && `${text}`}?
          </h2>
          <p className="text-base">
            Once the oction is done you can't undo this anymore :(
          </p>
        </div>

        <div className="flex items-center gap-2 md:gap-3 w-full justify-end mt-5">
          <button type="button" onClick={() => setIsModalOpen(false)}>
            <Cta
              size="sm"
              text="Cancel"
              className="bg-red-600 hover:bg-red-700"
            />
          </button>
          <button
            type="button"
            onClick={() => {
              setIsConfirm(true);
              setIsModalOpen(false);
            }}
          >
            <Cta size="sm" text="Confirm" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
