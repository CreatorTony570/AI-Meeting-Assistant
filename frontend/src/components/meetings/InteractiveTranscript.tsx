import React, { useState } from 'react';
import { Play, Pause, SkipForward, SkipBack, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface TranscriptSegment {
  start: number;
  end: number;
  speaker: string;
  text: string;
}

export function InteractiveTranscript({ segments }: { segments: TranscriptSegment[] }) {
  const [currentTime, setCurrentTime] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredSegments = segments.filter(s => 
    s.text.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col h-[600px] bg-white dark:bg-slate-900 rounded-2xl border shadow-sm overflow-hidden">
      <div className="p-4 border-b bg-slate-50/50 dark:bg-slate-800/50 flex items-center justify-between">
        <div className="relative w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
          <input 
            type="text" 
            placeholder="Search transcript..." 
            className="w-full pl-9 pr-4 py-1.5 text-xs bg-white dark:bg-slate-950 rounded-lg border focus:ring-2 focus:ring-indigo-500 outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="h-8 w-8"><SkipBack size={16} /></Button>
          <Button className="h-8 w-8 rounded-full bg-indigo-600"><Play size={16} /></Button>
          <Button variant="ghost" size="icon" className="h-8 w-8"><SkipForward size={16} /></Button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {filteredSegments.map((segment, idx) => (
          <div 
            key={idx} 
            className={cn(
              "group flex gap-4 p-3 rounded-xl transition-colors cursor-pointer",
              currentTime >= segment.start && currentTime <= segment.end 
                ? "bg-indigo-50 dark:bg-indigo-900/20 border-l-4 border-indigo-600" 
                : "hover:bg-slate-50 dark:hover:bg-slate-800"
            )}
          >
            <div className="w-16 flex-shrink-0 text-xs font-mono text-slate-400 mt-1">
              {formatTime(segment.start)}
            </div>
            <div className="flex-1">
              <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider mb-1 block">
                {segment.speaker}
              </span>
              <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                {segment.text}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function formatTime(seconds: number) {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);
  return [h > 0 ? h : null, m, s].filter(x => x !== null).map(x => x!.toString().padStart(2, '0')).join(':');
}
