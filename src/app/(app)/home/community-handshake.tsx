"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export function CommunityHandshake() {
  const [phase, setPhase] = useState<"walking" | "shaking" | "celebrating">("walking");

  useEffect(() => {
    let isMounted = true;
    
    const runCycle = () => {
      if (!isMounted) return;
      setPhase("walking");
      
      setTimeout(() => {
        if (isMounted) setPhase("shaking");
      }, 2000);
      
      setTimeout(() => {
        if (isMounted) setPhase("celebrating");
      }, 4000);
    };

    runCycle();
    const interval = setInterval(runCycle, 7000);

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="w-full h-8 relative flex items-center justify-center animate-in fade-in zoom-in-95 duration-700 delay-0 fill-mode-both mb-[-12px] z-50">
      <div className="relative w-full max-w-[150px] h-full flex items-center justify-center">
        
        {/* Left 3D Character */}
        <div 
          className={`absolute flex transition-all duration-[2000ms] ease-linear
            ${phase === 'walking' ? 'left-[-40px] opacity-100' : 'left-[50px] opacity-0'}
          `}
        >
          <div className={`${phase === 'walking' ? 'animate-[bounce_0.5s_infinite]' : ''}`}>
            <div className="w-8 h-8 relative filter drop-shadow-md">
              <img 
                src="https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Man%20walking%20facing%20right/Default/3D/man_walking_facing_right_3d_default.png" 
                alt="Walking" 
                
                className="w-full h-full object-contain" 
              />
            </div>
          </div>
        </div>

        {/* Right 3D Character (Flipped to face left) */}
        <div 
          className={`absolute flex transition-all duration-[2000ms] ease-linear
            ${phase === 'walking' ? 'right-[-40px] opacity-100' : 'right-[50px] opacity-0'}
          `}
        >
          <div className={`${phase === 'walking' ? 'animate-[bounce_0.5s_infinite]' : ''}`} style={{ animationDelay: '150ms' }}>
            <div className="w-8 h-8 relative filter drop-shadow-md transform -scale-x-100">
              <img 
                src="https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Woman%20walking%20facing%20right/Default/3D/woman_walking_facing_right_3d_default.png" 
                alt="Walking" 
                
                className="w-full h-full object-contain" 
              />
            </div>
          </div>
        </div>

        {/* 3D Handshake / Celebration */}
        <div 
          className={`absolute transition-all duration-500 flex items-center justify-center
            ${phase === 'walking' ? 'scale-0 opacity-0' : ''}
            ${phase === 'shaking' ? 'scale-100 opacity-100' : ''}
            ${phase === 'celebrating' ? 'scale-110 opacity-100' : ''}
          `}
        >
          {phase === 'shaking' && (
            <div className="w-10 h-10 relative animate-[wiggle_1s_ease-in-out_infinite] filter drop-shadow-lg z-10">
              <img 
                src="https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Handshake/3D/handshake_3d.png" 
                alt="Handshake" 
                
                className="w-full h-full object-contain" 
              />
            </div>
          )}
          
          {phase === 'celebrating' && (
            <div className="flex items-center gap-1.5 bg-gradient-to-r from-indigo-50 to-fuchsia-50 px-3 py-1 rounded-full border border-indigo-100/50 animate-in zoom-in duration-500 shadow-sm relative z-10">
              <div className="w-3.5 h-3.5 relative">
                 <img 
                  src="https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Party%20popper/3D/party_popper_3d.png" 
                  alt="Party" 
                                    className="w-full h-full object-contain" 
                />
              </div>
              <span className="text-[9px] font-black uppercase tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-fuchsia-600">
                Connected
              </span>
            </div>
          )}
        </div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes wiggle {
          0%, 100% { transform: rotate(-10deg); }
          50% { transform: rotate(10deg); }
        }
      `}} />
    </div>
  );
}
