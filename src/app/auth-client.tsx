"use client";

import { useState, useTransition } from "react";
import { Building2, KeyRound, Sparkles, UserPlus, Fingerprint, ArrowRight, Loader2, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { login, signup } from "@/app/actions/auth";

export default function AuthClientPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    const formData = new FormData(e.currentTarget);
    
    startTransition(async () => {
      let result;
      if (isLogin) {
        result = await login(formData);
      } else {
        result = await signup(formData);
      }
      
      if (result?.error) {
        setError(result.error);
      }
    });
  };

  return (
    <div className="flex min-h-screen w-full bg-gradient-to-br from-indigo-50/80 via-white to-purple-50/80 selection:bg-indigo-500/30 text-slate-900 flex-col relative">
      {/* Decorative background blur elements */}
      <div className="fixed top-0 left-0 w-full h-96 bg-gradient-to-b from-indigo-100/40 to-transparent pointer-events-none -z-10 blur-3xl" />
      <div className="fixed bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-purple-200/30 to-transparent pointer-events-none -z-10 blur-3xl rounded-full" />

      <main className="flex-1 w-full max-w-md mx-auto relative overflow-y-auto overflow-x-hidden pb-12 z-0 flex flex-col justify-center min-h-screen p-6">
        {/* Branding Header */}
        <div className="flex flex-col items-center justify-center mb-8 gap-4">
          <div className="w-14 h-14 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-xl shadow-indigo-500/30">
            <Sparkles className="w-7 h-7 text-white" />
          </div>
          <div className="text-center">
            <h1 className="text-3xl font-black tracking-tight text-slate-900 mb-1">MyKoodu</h1>
            <p className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">My community. My people. My world.</p>
          </div>
        </div>

        <div className="w-full bg-white/80 backdrop-blur-xl border border-white rounded-[2rem] p-6 sm:p-8 shadow-2xl shadow-indigo-900/5">
          
          {/* Auth Tabs */}
          <div className="flex bg-slate-100/50 p-1 rounded-2xl mb-8">
            <button 
              onClick={() => { setIsLogin(true); setError(null); }}
              className={cn(
                "flex-1 py-3 text-sm font-bold rounded-xl transition-all",
                isLogin ? "bg-white text-indigo-900 shadow-sm" : "text-slate-500 hover:text-slate-700"
              )}
            >
              Resident Login
            </button>
            <button 
              onClick={() => { setIsLogin(false); setError(null); }}
              className={cn(
                "flex-1 py-3 text-sm font-bold rounded-xl transition-all",
                !isLogin ? "bg-white text-indigo-900 shadow-sm" : "text-slate-500 hover:text-slate-700"
              )}
            >
              New Move-in
            </button>
          </div>

          <div className="mb-6">
            <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
              {isLogin ? "Welcome home." : "Join the society."}
            </h2>
            <p className="text-sm font-medium text-slate-500 mt-1">
              {isLogin ? "Enter your society credentials to enter." : "Verify your apartment to get started."}
            </p>
          </div>
          
          <div className="mb-6 p-4 bg-indigo-50 border border-indigo-100 rounded-xl">
            <p className="text-xs font-bold text-indigo-900 uppercase tracking-widest mb-1">Demo Access</p>
            <p className="text-sm text-indigo-700 font-medium">Use <span className="font-bold bg-indigo-100 px-1 py-0.5 rounded">test@example.com</span>, any password, and Society Passcode <span className="font-bold bg-indigo-100 px-1 py-0.5 rounded">KOODU-2026</span> to bypass verification!</p>
          </div>
          
          {error && (
            <div className="mb-6 p-3 bg-red-50 border border-red-200 text-red-600 text-sm font-medium rounded-xl">
              {error}
            </div>
          )}

          <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
            
            {!isLogin && (
              <>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Full Name</label>
                  <div className="relative">
                    <User className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input name="name" type="text" placeholder="John Doe" required className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-4 pl-12 pr-4 text-sm text-slate-900 placeholder:text-slate-400 font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all" />
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-1 space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Tower</label>
                    <div className="relative">
                      <Building2 className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                      <select name="tower" required className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-4 pl-12 pr-4 text-sm text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all appearance-none">
                        <option value="Tower A">Tower A</option>
                        <option value="Tower B">Tower B</option>
                        <option value="Tower C">Tower C</option>
                      </select>
                    </div>
                  </div>
                  <div className="flex-1 space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Flat #</label>
                    <input name="flat" type="text" placeholder="e.g. 402" required className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-4 px-4 text-sm text-slate-900 placeholder:text-slate-400 font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-indigo-600 uppercase tracking-widest">Society Passcode</label>
                  <div className="relative">
                    <KeyRound className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-indigo-400" />
                    <input name="passcode" type="text" placeholder="e.g. KOODU-2026" required className="w-full bg-indigo-50/50 border border-indigo-200 rounded-2xl py-4 pl-12 pr-4 text-sm text-indigo-900 placeholder:text-indigo-400 font-bold focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all uppercase" />
                  </div>
                </div>
              </>
            )}

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Email Address</label>
              <div className="relative">
                <Fingerprint className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input name="email" type="email" placeholder="hello@example.com" required className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-4 pl-12 pr-4 text-sm text-slate-900 placeholder:text-slate-400 font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Password</label>
              <div className="relative">
                <KeyRound className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input name="password" type="password" placeholder="••••••••" required className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-4 pl-12 pr-4 text-sm text-slate-900 placeholder:text-slate-400 font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all" />
              </div>
            </div>

            <button
              type="submit"
              disabled={isPending}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 px-6 rounded-2xl mt-4 transition-all flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/20 group disabled:opacity-70"
            >
              {isPending ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Please wait...
                </>
              ) : (
                <>
                  {isLogin ? "Access Community" : "Submit Verification"}
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
