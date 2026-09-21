"use client";

import { useState, KeyboardEvent } from "react";
import { X } from "lucide-react";

export function TagsInput() {
  const [tags, setTags] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      const newTag = inputValue.trim();
      if (newTag && !tags.includes(newTag)) {
        setTags([...tags, newTag]);
      }
      setInputValue("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  return (
    <div className="space-y-3">
      <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">
        Specific Skills / Tags
      </label>
      
      {/* Hidden input to pass data to Server Action */}
      <input type="hidden" name="skills" value={JSON.stringify(tags)} />

      <div className="flex flex-wrap gap-2 mb-2">
        {tags.map((tag) => (
          <div key={tag} className="flex items-center gap-1.5 bg-indigo-50 border border-indigo-100 text-indigo-700 px-3 py-1.5 rounded-xl text-xs font-bold animate-in zoom-in duration-200">
            {tag}
            <button 
              type="button" 
              onClick={() => removeTag(tag)}
              className="text-indigo-400 hover:text-indigo-600 focus:outline-none"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>

      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Type a skill and press Enter (e.g. Algebra, Baking, React)"
        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
      />
    </div>
  );
}
