"use client";

import { Button } from "@/components/ui/button";
import {
  BarChart3,
  ShieldCheck,
  Zap,
  ArrowRight,
  Github,
  Sparkles,
  Mic,
  Brain,
  Globe,
  CheckCircle,
  Play,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function LandingPage() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div className="flex flex-col min-h-screen bg-[#030712] text-white overflow-x-hidden">

      {/* ── Navbar ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-4 border-b border-white/5 bg-[#030712]/80 backdrop-blur-xl">
        <div className="flex items-center gap-2.5">
          <div className="h-8 w-8 bg-gradient-to-br from-indigo-500 to-violet-600 rounded-lg flex items-center justify-center shadow-lg shadow-indigo-500/30">
            <Zap className="text-white" size={16} />
          </div>
          <span className="text-lg font-bold tracking-tight bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
            MeetingAI
          </span>
        </div>

        <div className="hidden md:flex items-center gap-8">
          {["Features", "Pricing", "Docs"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-sm font-medium text-white/50 hover:text-white transition-colors"
            >
              {item}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" className="text-white/60 hover:text-white hover:bg-white/5">
            Login
          </Button>
          <Button
            size="sm"
            className="bg-indigo-600 hover:bg-indigo-500 text-white rounded-full px-5 shadow-lg shadow-indigo-500/25 transition-all"
          >
            Get Started
          </Button>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="relative pt-40 pb-32 px-8 flex flex-col items-center text-center">
        {/* Background blobs */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-indigo-600/10 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute top-40 left-1/4 w-[300px] h-[300px] bg-violet-600/10 blur-[100px] rounded-full pointer-events-none" />
        <div className="absolute top-40 right-1/4 w-[300px] h-[300px] bg-fuchsia-600/10 blur-[100px] rounded-full pointer-events-none" />

        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 text-xs font-medium mb-8">
          <Sparkles size={12} />
          Powered by GPT-4o, Gemini & Whisper
        </div>

        <h1 className="text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tighter mb-6 max-w-5xl leading-[1.05]">
          <span className="bg-gradient-to-b from-white via-white to-white/40 bg-clip-text text-transparent">
            Turn meetings into
          </span>
          <br />
          <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
            Actionable Intelligence
          </span>
        </h1>

        <p className="text-lg text-white/40 max-w-xl mb-10 leading-relaxed">
          The AI Meeting Assistant that transcribes, summarizes, and extracts action items — automatically. Works with any AI provider.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 mb-20">
          <Link href="/dashboard">
            <Button
              size="lg"
              className="h-13 px-8 text-base bg-indigo-600 hover:bg-indigo-500 text-white rounded-full gap-2 shadow-xl shadow-indigo-500/30 transition-all hover:scale-105"
            >
              Launch Dashboard <ArrowRight size={18} />
            </Button>
          </Link>
          <a href="https://github.com/CreatorTony570/AI-Meeting-Assistant" target="_blank" rel="noopener noreferrer">
            <Button
              variant="outline"
              size="lg"
              className="h-13 px-8 text-base rounded-full gap-2 border-white/10 bg-white/5 text-white hover:bg-white/10 transition-all"
            >
              <Github size={18} /> View on GitHub
            </Button>
          </a>
        </div>

        {/* Mock dashboard preview */}
        <div className="relative w-full max-w-5xl">
          <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-transparent to-transparent z-10 pointer-events-none" />
          <div className="w-full rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-sm p-1 shadow-2xl shadow-black/50">
            <div className="rounded-xl bg-[#0d1117] border border-white/5 aspect-video flex flex-col overflow-hidden">
              {/* Fake browser bar */}
              <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/60" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                  <div className="w-3 h-3 rounded-full bg-green-500/60" />
                </div>
                <div className="flex-1 mx-4 h-5 rounded-md bg-white/5 flex items-center justify-center">
                  <span className="text-[10px] text-white/20">meetingai.app/dashboard</span>
                </div>
              </div>
              {/* Fake dashboard content */}
              <div className="flex flex-1 overflow-hidden">
                {/* Sidebar */}
                <div className="w-48 border-r border-white/5 p-4 flex flex-col gap-3">
                  {["Dashboard", "Meetings", "Analytics", "AI Settings"].map((item, i) => (
                    <div key={item} className={`h-7 rounded-lg flex items-center px-3 gap-2 ${i === 0 ? "bg-indigo-500/20" : "bg-white/3"}`}>
                      <div className={`w-3 h-3 rounded-sm ${i === 0 ? "bg-indigo-400" : "bg-white/10"}`} />
                      <div className={`h-2 rounded-full flex-1 ${i === 0 ? "bg-indigo-400/40" : "bg-white/10"}`} />
                    </div>
                  ))}
                </div>
                {/* Main */}
                <div className="flex-1 p-4 grid grid-cols-3 gap-3 content-start">
                  {[
                    { color: "from-indigo-500/20 to-indigo-500/5", label: "24 Meetings" },
                    { color: "from-violet-500/20 to-violet-500/5", label: "38 Action Items" },
                    { color: "from-fuchsia-500/20 to-fuchsia-500/5", label: "34m Avg Duration" },
                  ].map(({ color, label }) => (
                    <div key={label} className={`rounded-xl bg-gradient-to-br ${color} border border-white/5 p-3 flex flex-col gap-2`}>
                      <div className="h-2 w-16 rounded-full bg-white/10" />
                      <div className="h-5 w-24 rounded-full bg-white/20" />
                    </div>
                  ))}
                  <div className="col-span-3 rounded-xl bg-white/[0.03] border border-white/5 p-3">
                    <div className="flex gap-1 h-16 items-end">
                      {[40, 65, 45, 80, 55, 90, 70, 85, 60, 95, 75, 88].map((h, i) => (
                        <div key={i} className="flex-1 rounded-sm bg-gradient-to-t from-indigo-500/60 to-violet-500/30" style={{ height: `${h}%` }} />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats Bar ── */}
      <section className="py-12 border-y border-white/5 bg-white/[0.02]">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 px-8 text-center">
          {[
            { value: "50+", label: "Languages Supported" },
            { value: "99%", label: "Transcription Accuracy" },
            { value: "3x", label: "Faster than Manual Notes" },
            { value: "0", label: "Setup Required" },
          ].map(({ value, label }) => (
            <div key={label}>
              <div className="text-3xl font-extrabold bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent mb-1">{value}</div>
              <div className="text-sm text-white/40">{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Features ── */}
      <section id="features" className="py-32 px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-indigo-400 text-sm font-semibold uppercase tracking-widest mb-3">Features</p>
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-b from-white to-white/50 bg-clip-text text-transparent">
              Everything you need
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: <Mic className="text-indigo-400" size={22} />,
                color: "from-indigo-500/10 to-indigo-500/0",
                border: "border-indigo-500/20",
                title: "Instant Transcription",
                description: "Powered by Whisper, our engine supports 50+ languages with industry-leading accuracy in real time.",
              },
              {
                icon: <ShieldCheck className="text-emerald-400" size={22} />,
                color: "from-emerald-500/10 to-emerald-500/0",
                border: "border-emerald-500/20",
                title: "Enterprise Security",
                description: "SOC2 compliant infrastructure with AES-256 encryption. Your meeting data stays yours.",
              },
              {
                icon: <BarChart3 className="text-violet-400" size={22} />,
                color: "from-violet-500/10 to-violet-500/0",
                border: "border-violet-500/20",
                title: "Actionable Analytics",
                description: "Extract sentiment, decisions, and tasks. Sync directly with your CRM and PM tools.",
              },
              {
                icon: <Brain className="text-fuchsia-400" size={22} />,
                color: "from-fuchsia-500/10 to-fuchsia-500/0",
                border: "border-fuchsia-500/20",
                title: "Multi-Provider AI",
                description: "Choose between OpenAI GPT-4o, Google Gemini, or OpenRouter — bring your own key.",
              },
              {
                icon: <Globe className="text-amber-400" size={22} />,
                color: "from-amber-500/10 to-amber-500/0",
                border: "border-amber-500/20",
                title: "Global Integrations",
                description: "Connect with Slack, Notion, and your existing workflow tools out of the box.",
              },
              {
                icon: <CheckCircle className="text-sky-400" size={22} />,
                color: "from-sky-500/10 to-sky-500/0",
                border: "border-sky-500/20",
                title: "Auto Action Items",
                description: "AI extracts tasks, owners, and deadlines from every meeting — no manual effort needed.",
              },
            ].map((f, i) => (
              <div
                key={i}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                className={`relative p-6 rounded-2xl border bg-gradient-to-br ${f.color} ${f.border} transition-all duration-300 cursor-default ${hovered === i ? "scale-[1.02] shadow-2xl shadow-black/40" : ""}`}
              >
                <div className="h-11 w-11 rounded-xl bg-white/5 flex items-center justify-center mb-5">
                  {f.icon}
                </div>
                <h3 className="text-base font-bold text-white mb-2">{f.title}</h3>
                <p className="text-sm text-white/40 leading-relaxed">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-24 px-8">
        <div className="max-w-3xl mx-auto text-center relative">
          <div className="absolute inset-0 bg-indigo-600/10 blur-[80px] rounded-full pointer-events-none" />
          <p className="text-indigo-400 text-sm font-semibold uppercase tracking-widest mb-4">Get Started Free</p>
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-b from-white to-white/50 bg-clip-text text-transparent mb-6">
            Your meetings deserve better
          </h2>
          <p className="text-white/40 mb-10">No credit card required. Works with your existing AI provider key.</p>
          <Link href="/dashboard">
            <Button
              size="lg"
              className="h-14 px-10 text-lg bg-indigo-600 hover:bg-indigo-500 text-white rounded-full gap-2 shadow-2xl shadow-indigo-500/30 transition-all hover:scale-105"
            >
              Launch Dashboard <ArrowRight size={20} />
            </Button>
          </Link>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-white/5 py-12 px-8">
        <div className="max-w-6xl mx-auto flex flex-col items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 bg-gradient-to-br from-indigo-500 to-violet-600 rounded-md flex items-center justify-center">
              <Zap className="text-white" size={12} />
            </div>
            <span className="text-sm font-semibold text-white/40 tracking-widest uppercase">MeetingAI</span>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex-1 h-px w-24 bg-gradient-to-r from-transparent to-indigo-500/40" />
            <Sparkles size={12} className="text-indigo-400" />
            <div className="flex-1 h-px w-24 bg-gradient-to-l from-transparent to-indigo-500/40" />
          </div>

          <div className="text-center">
            <p className="text-xs text-white/20 uppercase tracking-[0.2em] mb-1">Crafted with curiosity & code by</p>
            <p className="text-2xl font-extrabold tracking-tight bg-gradient-to-r from-indigo-400 via-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
              Mridul Sharma
            </p>
            <p className="text-xs text-white/20 mt-2">© {new Date().getFullYear()} · All rights reserved</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
