import React from 'react';

interface ToastProps {
  message: string | null;
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, onClose }) => {
  if (!message) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-bounce-in max-w-sm">
      <div className="bg-[#131b2e] text-white px-4 py-3 rounded-xl shadow-2xl flex items-center gap-3 border border-white/10 text-xs">
        <span className="material-symbols-outlined text-[#6cf8bb] text-[20px] shrink-0">
          info
        </span>
        <span className="flex-1 font-medium leading-normal">{message}</span>
        <button
          onClick={onClose}
          className="text-[#c4c5d7] hover:text-white p-1 rounded transition-colors"
        >
          <span className="material-symbols-outlined text-[16px]">close</span>
        </button>
      </div>
    </div>
  );
};
