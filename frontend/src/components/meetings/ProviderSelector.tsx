import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Cpu, Zap, Brain, Globe } from "lucide-react";

export function ProviderSelector({ value, onChange }: any) {
  const providers = [
    { id: 'openai', name: 'OpenAI (GPT-4o)', icon: <Brain className="text-emerald-500" size={16} />, cost: 'Paid' },
    { id: 'gemini', name: 'Google Gemini', icon: <Zap className="text-amber-500" size={16} />, cost: 'Free/Paid' },
    { id: 'openrouter', name: 'OpenRouter (Llama 3)', icon: <Globe className="text-indigo-500" size={16} />, cost: 'Flexible' },
  ];

  return (
    <div className="flex flex-col gap-2">
      <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">AI Analysis Provider</label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="w-full bg-white dark:bg-slate-900 border-slate-200">
          <SelectValue placeholder="Select Provider" />
        </SelectTrigger>
        <SelectContent>
          {providers.map((p) => (
            <SelectItem key={p.id} value={p.id}>
              <div className="flex items-center gap-2">
                {p.icon}
                <span>{p.name}</span>
                <span className="text-[10px] bg-slate-100 px-1.5 py-0.5 rounded text-slate-500 ml-2">{p.cost}</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
