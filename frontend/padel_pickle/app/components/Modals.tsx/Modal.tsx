"use client";

    type Props = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
};
export default function Modal({ isOpen, onClose, children }: Props){

    if (!isOpen) return null;

    return(

    <div className="fixed inset-0 flex items-center justify-center z-50">
      
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-3xl shadow-2xl w-125 p-5 z-10">
        {children}
      </div>
    </div>
  );
}
    
