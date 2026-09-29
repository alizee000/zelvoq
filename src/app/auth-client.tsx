"use client";

import { Logo } from "@/components/shared/logo";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { login, signup } from "@/app/actions/auth";
import { useRouter } from "next/navigation";

export default function AuthClientPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg("");
    
    const formData = new FormData(e.currentTarget);
    try {
      const result = await login(formData);
      if (result?.error) {
        setErrorMsg(result.error);
        setIsLoading(false);
      } else if (result?.success) {
        window.location.href = "/home"; // Hard redirect to force re-render
      }
    } catch (e) {
      // In case next.js throws a redirect error anyway
      window.location.href = "/home";
    }
  };

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg("");
    
    const formData = new FormData(e.currentTarget);
    try {
      const result = await signup(formData);
      if (result?.error) {
        setErrorMsg(result.error);
        setIsLoading(false);
      } else if (result?.success) {
        window.location.href = "/home";
      }
    } catch (e) {
      window.location.href = "/home";
    }
  };

  return (
    <div className="flex min-h-screen w-full bg-slate-100 flex-col relative items-center">
      
      {/* 
        This outermost container creates a "Mobile App Frame" on desktop monitors,
        matching the exact constraint used by the main app layout. 
      */}
      <main className="flex-1 w-full max-w-md relative overflow-y-auto overflow-x-hidden hide-scrollbar bg-white shadow-2xl border-x border-slate-200 min-h-[100dvh] flex flex-col font-sans">
        
        {/* PREMIUM NATIVE BACKGROUND (Constrained strictly inside the mobile frame) */}
        <div className="absolute inset-0 w-full h-full bg-[#FAFAFA] z-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-[20%] -left-[10%] w-[70vw] h-[70vw] max-w-[500px] max-h-[500px] bg-indigo-500/10 blur-[90px] rounded-full animate-pulse-slow" />
          <div className="absolute -bottom-[20%] -right-[10%] w-[80vw] h-[80vw] max-w-[600px] max-h-[600px] bg-orange-400/10 blur-[90px] rounded-full" />
        </div>

        <div className="flex-1 flex flex-col justify-between relative z-10 w-full min-h-[100dvh] pt-8">
          
          {/* Brand Header */}
          <div className="flex-1 flex flex-col items-center justify-center pointer-events-none px-6 text-center shrink-0 min-h-[220px] pb-6">
            <div className="w-16 h-16 rounded-3xl bg-slate-900 flex items-center justify-center shadow-xl shadow-slate-900/10 mb-4">
              <Logo className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight mb-1">MyKoodu</h1>
            <p className="text-[10px] font-bold uppercase tracking-[0.1em] text-slate-400 mb-4">My community. My people. My world.</p>
            
            <p className="text-[14px] font-medium text-slate-600 leading-relaxed max-w-[300px]">
              Discover hidden talents, borrow tools, and join local events instantly within your society.
            </p>
          </div>

          {/* Bottom Sheet Auth Container */}
          <motion.div 
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: "spring", damping: 25, stiffness: 200, delay: 0.1 }}
            className="w-full pb-12 pt-8 px-6 sm:px-8 bg-white rounded-t-[2.5rem] shadow-[0_-20px_40px_rgba(0,0,0,0.04)] border-t border-slate-100 relative z-20"
          >
            {/* Native Mobile Sheet Drag Indicator */}
            <div className="w-12 h-1.5 bg-slate-200 rounded-full mx-auto mb-8" />

            {/* Custom Native Toggle */}
            <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-2xl mb-8 w-full">
              <button 
                type="button"
                onClick={() => { setIsLogin(true); setErrorMsg(""); }}
                className={`flex-1 py-3 text-[15px] font-bold rounded-xl transition-all ${isLogin ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
              >
                Log In
              </button>
              <button 
                type="button"
                onClick={() => { setIsLogin(false); setErrorMsg(""); }}
                className={`flex-1 py-3 text-[15px] font-bold rounded-xl transition-all ${!isLogin ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
              >
                Sign Up
              </button>
            </div>

            <div className="w-full relative min-h-[340px]">
              <AnimatePresence mode="wait">
                {isLogin ? (
                  <motion.div
                    key="login"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.2 }}
                    className="absolute inset-0"
                  >
                    <form onSubmit={handleLogin} className="flex flex-col gap-4">
                      <div>
                        <input 
                          name="email"
                          type="email"
                          required
                          placeholder="hello@neighbor.com"
                          className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 px-5 text-[16px] font-bold text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:bg-white transition-all shadow-sm"
                        />
                      </div>
                      <div>
                        <input 
                          name="password"
                          type="password"
                          placeholder="••••••••"
                          className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 px-5 text-[16px] font-bold text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:bg-white transition-all shadow-sm"
                        />
                      </div>
                      
                      {errorMsg && (
                        <p className="text-rose-500 text-sm font-bold text-center mt-2">{errorMsg}</p>
                      )}

                      <button 
                        disabled={isLoading}
                        type="submit"
                        className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-4 rounded-2xl mt-4 transition-all text-[17px] shadow-lg shadow-slate-900/20 active:scale-[0.98] disabled:opacity-70 flex justify-center items-center h-14"
                      >
                        {isLoading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : "Log In"}
                      </button>
                    </form>
                  </motion.div>
                ) : (
                  <motion.div
                    key="signup"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2 }}
                    className="absolute inset-0"
                  >
                    <form onSubmit={handleSignup} className="flex flex-col gap-3.5 pb-20">
                      <div>
                        <input 
                          name="name"
                          type="text"
                          required
                          placeholder="Full Name (Jane Doe)"
                          className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-3.5 px-5 text-[16px] font-bold text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:bg-white transition-all shadow-sm"
                        />
                      </div>
                      <div>
                        <input 
                          name="email"
                          type="email"
                          required
                          placeholder="Email Address"
                          className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-3.5 px-5 text-[16px] font-bold text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:bg-white transition-all shadow-sm"
                        />
                      </div>
                      <div className="flex gap-3">
                        <div className="flex-1">
                          <input 
                            name="tower"
                            type="text"
                            required
                            placeholder="Tower (e.g. A)"
                            className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-3.5 px-5 text-[16px] font-bold text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:bg-white transition-all shadow-sm"
                          />
                        </div>
                        <div className="flex-1">
                          <input 
                            name="flat"
                            type="text"
                            required
                            placeholder="Flat (e.g. 404)"
                            className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-3.5 px-5 text-[16px] font-bold text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:bg-white transition-all shadow-sm"
                          />
                        </div>
                      </div>
                      <div>
                        <input 
                          name="passcode"
                          type="text"
                          required
                          placeholder="Society Passcode (KOODU-2026)"
                          className="w-full bg-amber-50/50 border border-amber-100 rounded-2xl py-3.5 px-5 text-[16px] font-bold text-slate-900 placeholder:text-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:bg-white transition-all shadow-sm"
                        />
                      </div>
                      <div>
                        <input 
                          name="password"
                          type="password"
                          placeholder="Create Password"
                          className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-3.5 px-5 text-[16px] font-bold text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:bg-white transition-all shadow-sm"
                        />
                      </div>
                      
                      {errorMsg && (
                        <p className="text-rose-500 text-sm font-bold text-center mt-1">{errorMsg}</p>
                      )}

                      <button 
                        disabled={isLoading}
                        type="submit"
                        className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-4 rounded-2xl mt-4 transition-all text-[17px] shadow-lg shadow-slate-900/20 active:scale-[0.98] disabled:opacity-70 flex justify-center items-center h-14"
                      >
                        {isLoading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : "Join Community"}
                      </button>
                    </form>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </main>

      {/* Global CSS to hide scrollbars */}
      <style dangerouslySetInnerHTML={{__html: `
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />
    </div>
  );
}
