"use client";

import { useState } from "react";
import { Settings, X, Loader2, MapPin, Building2, Home } from "lucide-react";
import { updateUserMetadata } from "@/app/actions/user";

export function EditProfileModal({ 
  currentFlat, 
  currentTower, 
  currentSociety 
}: { 
  currentFlat: string, 
  currentTower: string, 
  currentSociety: string 
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, setIsPending] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsPending(true);
    const formData = new FormData(e.currentTarget);
    await updateUserMetadata(formData);
    setIsPending(false);
    setIsOpen(false);
  }

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="w-10 h-10 rounded-full flex items-center justify-center bg-slate-100 text-slate-600 transition-colors hover:bg-slate-200"
      >
        <Settings className="w-5 h-5" />
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center bg-slate-900/20 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white w-full sm:max-w-md sm:rounded-[2rem] rounded-t-[2rem] p-6 shadow-2xl animate-in slide-in-from-bottom-8 duration-300">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-xl font-bold text-slate-900">Edit Residence</h2>
                <p className="text-xs text-slate-500 font-medium">Update your apartment details</p>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-slate-200"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Apartment / Society Name</label>
                <div className="relative">
                  <Building2 className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input 
                    name="society" 
                    defaultValue={currentSociety} 
                    required 
                    className="w-full bg-slate-50 border-none shadow-sm rounded-full py-3.5 pl-12 pr-4 text-sm font-medium text-slate-900 focus:ring-2 focus:ring-indigo-500/20 outline-none" 
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Block / Tower</label>
                  <div className="relative">
                    <MapPin className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input 
                      name="tower" 
                      defaultValue={currentTower} 
                      required 
                      className="w-full bg-slate-50 border-none shadow-sm rounded-full py-3.5 pl-12 pr-4 text-sm font-medium text-slate-900 focus:ring-2 focus:ring-indigo-500/20 outline-none" 
                    />
                  </div>
                </div>
                
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Flat Number</label>
                  <div className="relative">
                    <Home className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input 
                      name="flat" 
                      defaultValue={currentFlat} 
                      required 
                      className="w-full bg-slate-50 border-none shadow-sm rounded-full py-3.5 pl-12 pr-4 text-sm font-medium text-slate-900 focus:ring-2 focus:ring-indigo-500/20 outline-none" 
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={isPending}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-full mt-4 transition-all flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/20 disabled:opacity-70"
              >
                {isPending ? "Saving..." : "Save Details"}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
