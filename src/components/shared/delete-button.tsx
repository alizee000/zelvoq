"use client";

import { Trash2, AlertCircle } from "lucide-react";
import { deleteTalent, deleteGroupBuy } from "@/app/actions/delete-listing";
import { useState } from "react";

export function DeleteButton({ id, type }: { id: string, type: 'talent' | 'group_buy' }) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleDelete = async (e: React.MouseEvent) => {
    // Optimistic UI: Hide the modal instantly
    setShowConfirm(false);
    
    // Optimistic UI: Find the parent card and animate it away instantly
    const card = (e.target as HTMLElement).closest('.group') as HTMLElement;
    if (card) {
      card.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
      card.style.opacity = '0';
      card.style.transform = 'scale(0.95)';
      setTimeout(() => {
        card.style.display = 'none';
      }, 300);
    }

    setIsDeleting(true);
    try {
      if (type === 'talent') await deleteTalent(id);
      else await deleteGroupBuy(id);
    } catch (err) {
      console.error(err);
      setIsDeleting(false);
      // If it fails, we could revert the card visibility here
      if (card) {
        card.style.display = '';
        setTimeout(() => {
          card.style.opacity = '1';
          card.style.transform = 'scale(1)';
        }, 50);
      }
    }
  };

  return (
    <>
      <button 
        disabled={isDeleting}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setShowConfirm(true);
        }}
        className="absolute top-4 right-4 bg-white/90 backdrop-blur-md p-2 rounded-full shadow-sm text-rose-500 hover:bg-rose-50 hover:scale-110 transition-all z-20"
      >
        <Trash2 className="w-4 h-4" />
      </button>

      {showConfirm && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setShowConfirm(false);
          }}
        >
          <div 
            className="bg-white rounded-3xl w-full max-w-sm p-6 shadow-2xl animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-12 h-12 bg-rose-50 rounded-full flex items-center justify-center mb-4">
              <AlertCircle className="w-6 h-6 text-rose-500" />
            </div>
            <h3 className="text-xl font-black text-slate-900 mb-2">Delete Listing?</h3>
            <p className="text-sm text-slate-500 font-medium mb-6 leading-relaxed">
              Are you sure you want to delete this? This action cannot be undone and it will be removed from the community feed.
            </p>
            <div className="flex gap-3">
              <button 
                onClick={(e) => {
                  e.preventDefault();
                  setShowConfirm(false);
                }}
                disabled={isDeleting}
                className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-3.5 rounded-xl transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button 
                onClick={(e) => {
                  e.preventDefault();
                  handleDelete(e);
                }}
                disabled={isDeleting}
                className="flex-1 bg-rose-500 hover:bg-rose-600 text-white font-bold py-3.5 rounded-xl transition-colors shadow-sm shadow-rose-500/20 disabled:opacity-70 flex items-center justify-center gap-2"
              >
                {isDeleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
