import React from 'react';
import { Modal } from './Modal';
import { AlertTriangle } from 'lucide-react';

interface ConfirmDialogProps {
  isOpen: boolean;
  title?: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  isDestructive?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  isOpen,
  title = 'Konfirmasi Tindakan',
  message,
  confirmLabel = 'Hapus',
  cancelLabel = 'Batal',
  isDestructive = true,
  onConfirm,
  onCancel,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onCancel} title={title} maxWidth="sm">
      <div className="flex items-start gap-4">
        <div
          className={`p-3 rounded-full shrink-0 ${
            isDestructive ? 'bg-rose-100 text-rose-600' : 'bg-amber-100 text-amber-600'
          }`}
        >
          <AlertTriangle className="w-6 h-6" />
        </div>
        <div>
          <p className="text-sm text-slate-600 leading-relaxed">{message}</p>
        </div>
      </div>

      <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-slate-100">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-sm font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
        >
          {cancelLabel}
        </button>
        <button
          type="button"
          onClick={onConfirm}
          className={`px-4 py-2 text-sm font-medium text-white rounded-lg transition-colors ${
            isDestructive
              ? 'bg-rose-600 hover:bg-rose-700 shadow-sm shadow-rose-200'
              : 'bg-blue-600 hover:bg-blue-700 shadow-sm shadow-blue-200'
          }`}
        >
          {confirmLabel}
        </button>
      </div>
    </Modal>
  );
};
