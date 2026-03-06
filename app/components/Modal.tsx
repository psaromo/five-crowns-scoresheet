import { Button, Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import { Dispatch, SetStateAction } from 'react';
import { PrimaryButton, SecondaryButton } from './Button';

interface ModalProps {
  modalIsOpen: boolean;
  setModalIsOpen: Dispatch<SetStateAction<boolean>>;
  closeModal: () => void;
  title: string;
  content: JSX.Element;
  confirmButtonText: string;
  onConfirm?: () => void;
}
export const Modal = ({
  modalIsOpen,
  setModalIsOpen,
  closeModal,
  title,
  content,
  confirmButtonText,
  onConfirm,
}: ModalProps) => {
  const handleConfirm = () => {
    onConfirm?.();
    closeModal();
  };

  return (
    <Dialog
      open={modalIsOpen}
      as="div"
      className="relative z-20 focus:outline-none"
      onClose={closeModal}
    >
      <div className="fixed inset-0 z-20 w-screen overflow-y-auto bg-black/40">
        <div className="flex min-h-full items-center justify-center p-4">
          <DialogPanel
            transition
            className="w-full max-w-md rounded-xl bg-white/5 p-6 backdrop-blur-2xl duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0"
          >
            <div className="flex justify-center items-center">
              <DialogTitle as="h2" className="font-bold text-xl text-white">
                {title}
              </DialogTitle>
            </div>
            {content}
            <div className="mt-6 flex items-center justify-center gap-4">
              <SecondaryButton text="Cancel" onClick={closeModal} />
              <PrimaryButton text={confirmButtonText} onClick={handleConfirm} />
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};
