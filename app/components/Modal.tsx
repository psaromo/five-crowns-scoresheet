import { Button, Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import { Dispatch, SetStateAction, useState } from 'react';
import { PrimaryButton } from './Button';

interface ModalProps {
  modalIsOpen: boolean;
  setModalIsOpen: Dispatch<SetStateAction<boolean>>;
  closeModal: () => void;
  title: string;
  content: JSX.Element;
  confirmButtonText: string;
}
export const Modal = ({
  modalIsOpen,
  setModalIsOpen,
  closeModal,
  title,
  content,
  confirmButtonText,
}: ModalProps) => {
  return (
    <Dialog
      open={modalIsOpen}
      as="div"
      className="relative z-20 focus:outline-none"
      onClose={closeModal}
    >
      <div className="fixed inset-0 z-20 w-screen overflow-y-auto">
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
            <div className="mt-4 flex items-center justify-center">
              <PrimaryButton text={confirmButtonText} onClick={closeModal} />
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};
