"use client";

import { useEffect, useState } from "react";

export function DynamicGreeting({ firstName }: { firstName: string }) {
  const [greeting, setGreeting] = useState("Good morning");
  const [emoji, setEmoji] = useState("☀️");

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) {
      setGreeting("Good morning");
      setEmoji("☀️");
    } else if (hour < 17) {
      setGreeting("Good afternoon");
      setEmoji("🌤️");
    } else if (hour < 21) {
      setGreeting("Good evening");
      setEmoji("🌙");
    } else {
      setGreeting("Good night");
      setEmoji("💤");
    }
  }, []);

  return (
    <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
      {emoji} {greeting}, {firstName}
    </h1>
  );
}
