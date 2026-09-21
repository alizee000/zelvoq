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
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[70%] rounded-full bg-gradient-to-br from-indigo-500/20 to-purple-600/10 blur-[100px] pointer-events-none" />
      <div className="absolute top-[40%] -right-[10%] w-[50%] h-[70%] rounded-full bg-gradient-to-br from-amber-400/20 to-orange-500/10 blur-[100px] pointer-events-none" />

      {/* LEFT: Branding & Vision (Visible on Desktop) */}
      <div className="hidden md:flex flex-col flex-1 p-12 justify-between relative z-10">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-500/30">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <span className="text-3xl font-black tracking-tight text-slate-900">MyINAI</span>
        </div>
        
        <div className="max-w-xl">
          <h1 className="text-5xl font-black text-slate-900 tracking-tight leading-[1.1] mb-6">
            Your Apartment,<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
              Unlocked.
            </span>
          </h1>
          <p className="text-xl text-slate-600 font-medium leading-relaxed mb-8">
            Connect with verified neighbors, discover hidden talents in your tower, and build a smarter community.
          </p>
          
          <div className="flex items-center gap-4 bg-white/60 backdrop-blur-md p-4 rounded-3xl border border-white/80 shadow-sm max-w-md">
            <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center shrink-0">
              <Building2 className="w-6 h-6 text-orange-600" />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-900">Join 1,200+ Residents</p>
              <p className="text-xs text-slate-500 font-medium">Currently active in your society</p>
            </div>
          </div>
        </div>
        
        <div className="text-sm font-bold text-slate-400 uppercase tracking-widest">
          Discover People. Discover Possibilities.
        </div>
      </div>

      {/* RIGHT: Auth Card */}
      <div className="flex-1 flex items-center justify-center p-6 relative z-10 w-full min-h-screen md:min-h-0">
        {/* Mobile Logo (Visible only on Mobile) */}
        <div className="absolute top-8 left-6 md:hidden flex items-center gap-2">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center shadow-md">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <span className="text-xl font-black tracking-tight text-slate-900">MyINAI</span>
        </div>

        <div className="w-full max-w-md bg-white/80 backdrop-blur-xl border border-white rounded-[2rem] p-8 shadow-2xl shadow-indigo-900/5">
          
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
            <p className="text-sm text-indigo-700 font-medium">Use <span className="font-bold bg-indigo-100 px-1 py-0.5 rounded">test@example.com</span> and any password to bypass email verification!</p>
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
                    <input name="name" type="text" placeholder="John Doe" required className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-4 pl-12 pr-4 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all" />
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-1 space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Tower</label>
                    <div className="relative">
                      <Building2 className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input name="tower" type="text" placeholder="e.g. Block A" required className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-4 pl-12 pr-4 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all" />
                    </div>
                  </div>
                  <div className="flex-1 space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Flat No.</label>
                    <input name="flat" type="text" placeholder="e.g. 104" required className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-4 px-4 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all" />
                  </div>
                </div>
              </>
            )}

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Email Address</label>
              <div className="relative">
                <Fingerprint className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input name="email" type="email" placeholder="Enter your email" required className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-4 pl-12 pr-4 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all" />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Passcode</label>
                {isLogin && <button type="button" className="text-xs font-bold text-indigo-600 hover:text-indigo-700">Forgot?</button>}
              </div>
              <div className="relative">
                <KeyRound className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input name="password" type="password" placeholder="••••••••" required className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-4 pl-12 pr-4 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all" />
              </div>
            </div>

            <button type="submit" disabled={isPending} className="mt-4 w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white rounded-2xl py-4 font-bold flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/30 transition-all active:scale-95 group">
              {isPending ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  {isLogin ? "Enter Community" : "Verify Residency"}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>

            {!isLogin && (
              <p className="text-xs text-center text-slate-500 font-medium mt-2">
                By joining, you agree to the <span className="text-indigo-600 font-bold cursor-pointer">Society Guidelines</span>.
              </p>
            )}

          </form>
        </div>
      </div>
    </div>
  );
}
