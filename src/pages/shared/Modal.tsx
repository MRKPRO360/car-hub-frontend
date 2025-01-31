// react icons
import { RxCross1 } from 'react-icons/rx';
interface IModal {
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
  setIsConfirm: (isOpen: boolean) => void;
}
const Modal = ({ isModalOpen, setIsModalOpen, setIsConfirm }: IModal) => {
  return (
    <div
      className={`${
        isModalOpen ? ' scale-[1] opacity-100' : ' scale-[0] opacity-0'
      } w-full h-screen fixed top-0 left-0 z-[200000000] bg-blue/50 flex items-center justify-center transition-all duration-300`}
    >
      <div className={`w-[90%] md:w-[30%] bg-light rounded-lg p-4`}>
        <div className="w-full flex justify-between">
          <div>
            <h2 className="text-[1.7rem] font-[500] text-[#202020]">
              Are you sure about it?
            </h2>
            <p className="text-[1rem] text-[#525252]">
              You can"t undo this action anymore
            </p>
          </div>

          <RxCross1
            className="p-2 text-[2.5rem] hover:bg-[#e7e7e7] rounded-full transition-all duration-300 cursor-pointer"
            onClick={() => setIsModalOpen(false)}
          />
        </div>

        <div className="flex items-center gap-2 md:gap-3 w-full justify-end mt-6">
          <button
            className="px-4 py-2 hover:bg-gray-100 border border-[#a8a8a8] rounded-lg text-[#585858]"
            onClick={() => setIsModalOpen(false)}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-[#3B9DF8] rounded-lg text-[#fff]"
            onClick={() => {
              setIsConfirm(true);
              setIsModalOpen(false);
            }}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
