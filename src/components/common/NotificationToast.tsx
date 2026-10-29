import React from 'react';
import { useAcademic } from '../../context/AcademicContext';
import { CheckCircle2, AlertTriangle, Info, XCircle, X } from 'lucide-react';

export const NotificationToast: React.FC = () => {
  const { toasts, removeToast } = useAcademic();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col space-y-2 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => {
        let bg = 'bg-white border-slate-200 text-slate-800';
        let icon = <Info className="w-5 h-5 text-blue-500 shrink-0" />;

        if (toast.type === 'success') {
          bg = 'bg-emerald-50 border-emerald-200 text-emerald-900';
          icon = <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />;
        } else if (toast.type === 'warning') {
          bg = 'bg-amber-50 border-amber-200 text-amber-900';
          icon = <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />;
        } else if (toast.type === 'error') {
          bg = 'bg-rose-50 border-rose-200 text-rose-900';
          icon = <XCircle className="w-5 h-5 text-rose-600 shrink-0" />;
        }

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-start gap-3 p-3.5 rounded-lg border shadow-lg transition-all animate-in fade-in slide-in-from-bottom-2 ${bg}`}
          >
            {icon}
            <div className="flex-1 text-sm font-medium leading-tight pt-0.5">{toast.message}</div>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-slate-400 hover:text-slate-600 p-0.5 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
