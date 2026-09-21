"use client";

import { X, Loader2, CheckCircle2 } from "lucide-react";
import { useEffect, useState } from "react";

interface ActionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => Promise<void>;
  title: string;
  description: React.ReactNode;
  confirmText: string;
  icon: React.ReactNode;
}

export function ActionModal({ isOpen, onClose, onConfirm, title, description, confirmText, icon }: ActionModalProps) {
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  // Reset status when opened
  useEffect(() => {
    if (isOpen) setStatus("idle");
  }, [isOpen]);

  if (!isOpen) return null;

  const handleConfirm = async () => {
    setStatus("loading");
    try {
      await onConfirm();
      setStatus("success");
      setTimeout(() => {
        onClose();
      }, 1500);
    } catch (e) {
      setStatus("idle");
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => status !== "loading" && onClose()} />
      <div className="bg-white rounded-3xl w-full max-w-sm shadow-2xl relative z-10 overflow-hidden animate-in zoom-in-95 duration-200">
        
        {status === "success" ? (
          <div className="p-8 flex flex-col items-center justify-center text-center gap-4">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center text-green-600 mb-2">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-extrabold text-slate-900">Success!</h3>
            <p className="text-sm text-slate-500 font-medium">Your request has been processed.</p>
          </div>
        ) : (
          <>
            <div className="p-6 pb-4">
              <button 
                onClick={onClose}
                className="absolute top-4 right-4 p-2 bg-slate-100 text-slate-400 hover:text-slate-600 rounded-full transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
              
              <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mb-4">
                {icon}
              </div>
              <h3 className="text-xl font-extrabold text-slate-900 leading-tight mb-2">{title}</h3>
              <div className="text-sm text-slate-500 leading-relaxed font-medium">
                {description}
              </div>
            </div>
            
            <div className="p-6 pt-2 flex gap-3">
              <button 
                onClick={onClose}
                disabled={status === "loading"}
                className="flex-1 py-3 rounded-xl font-bold text-sm bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button 
                onClick={handleConfirm}
                disabled={status === "loading"}
                className="flex-[2] py-3 rounded-xl font-bold text-sm bg-indigo-600 text-white hover:bg-indigo-700 transition-colors shadow-md shadow-indigo-500/20 disabled:bg-indigo-400 flex items-center justify-center gap-2"
              >
                {status === "loading" ? <Loader2 className="w-4 h-4 animate-spin" /> : confirmText}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
