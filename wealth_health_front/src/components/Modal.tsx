import { ReactNode } from "react";
import ReactModalConverted from "@nicoriera/react-modal-converted";

// Typage des props pour la modale réutilisable
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}

const Modal = ({ isOpen, onClose, title, children }: ModalProps) => {
  return (
    <ReactModalConverted
      isOpen={isOpen}
      onClose={onClose}
      showClose={true}
      overlayClassName="fixed inset-0 z-50 flex items-center justify-center bg-black/40 transition-opacity duration-300 ease-in-out"
      modalClassName="relative bg-white rounded-lg shadow-xl p-6 m-4 max-w-md w-full transform transition-all duration-300 ease-in-out scale-95 animate-fade-in-scale focus:outline-none"
      // Les props role/aria-modal sont à mettre sur le conteneur si la lib le permet, sinon c'est déjà géré
    >
      {title && (
        <h2 className="text-xl font-bold mb-4 pr-10" id="modal-title">
          {title}
        </h2>
      )}
      {children}
    </ReactModalConverted>
  );
};

export default Modal;
