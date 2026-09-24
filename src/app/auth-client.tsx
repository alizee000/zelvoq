"use client";

import { Sparkles } from "lucide-react";
import { Logo } from "@/components/shared/logo";
import { SignIn } from "@clerk/nextjs";

export default function AuthClientPage() {
  const clerkAppearance = {
    layout: {
      socialButtonsPlacement: "bottom",
      logoPlacement: "none",
    },
    elements: {
      cardBox: "w-full shadow-sm rounded-[2rem]",
      card: "shadow-none bg-white border border-slate-100 rounded-[2rem] p-8 w-full",
      headerTitle: "text-2xl font-extrabold text-slate-900 tracking-tight",
      headerSubtitle: "text-sm font-medium text-slate-500",
      socialButtonsBlockButton: "rounded-full py-3.5 bg-slate-50 border-none shadow-sm text-sm font-bold text-slate-900 hover:bg-slate-100 transition-all",
      formFieldInput: "w-full bg-slate-50 border-none shadow-sm rounded-full py-3.5 px-4 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/20 text-slate-900",
      formFieldLabel: "text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5",
      formButtonPrimary: "w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-full mt-2 transition-all shadow-lg shadow-indigo-600/20 text-[15px]",
      footerAction: "hidden", // We can hide it or let it stay. Let's let it stay to allow switching!
      footerActionText: "text-sm text-slate-500 font-medium",
      footerActionLink: "text-sm font-bold text-indigo-600 hover:text-indigo-700",
      dividerLine: "bg-slate-100",
      dividerText: "text-slate-400 text-xs font-bold uppercase",
      identityPreviewEditButtonIcon: "text-indigo-600",
      formFieldSuccessText: "text-emerald-600 text-xs",
      formFieldErrorText: "text-rose-600 text-xs mt-1"
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50/50 relative overflow-hidden">
      <div className="fixed top-0 left-0 w-full h-96 bg-gradient-to-b from-indigo-100/40 to-transparent pointer-events-none -z-10 blur-3xl" />
      <div className="fixed bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-purple-200/30 to-transparent pointer-events-none -z-10 blur-3xl rounded-full" />

      <main className="flex-1 flex flex-col items-center justify-center p-6 relative z-10 w-full max-w-md mx-auto min-h-[100dvh] py-12">
        <div className="mb-8 flex flex-col items-center text-center animate-in fade-in slide-in-from-bottom-4 duration-700 shrink-0">
          <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-2xl shadow-indigo-500/30 mb-6 relative group">
            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity rounded-3xl" />
            <Logo className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-black tracking-tighter text-slate-900 mb-2">MyKoodu</h1>
          <p className="text-slate-500 font-medium text-sm">My community. My people. My world.</p>
        </div>

        <div className="w-full animate-in fade-in slide-in-from-bottom-8 duration-700 delay-150 fill-mode-both shrink-0">
          <SignIn 
            appearance={clerkAppearance} 
            routing="hash"
            fallbackRedirectUrl="/home"
          />
        </div>
      </main>
    </div>
  );
}
