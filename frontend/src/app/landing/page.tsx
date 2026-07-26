import { Button } from "@/components/ui/button";
import { 
  BarChart3, 
  ShieldCheck, 
  Zap, 
  ArrowRight,
  Github,
  Sparkles
} from "lucide-react";
import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-8 py-4 border-b bg-white/50 backdrop-blur-md sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 bg-indigo-600 rounded-lg flex items-center justify-center">
            <Zap className="text-white" size={18} />
          </div>
          <span className="text-xl font-bold tracking-tight">MeetingAI</span>
        </div>
        <div className="hidden md:flex items-center gap-8">
          <a href="#features" className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors">Features</a>
          <a href="#pricing" className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors">Pricing</a>
          <a href="#docs" className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors">Docs</a>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm">Login</Button>
          <Button size="sm" className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-full">Get Started</Button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-24 px-8 flex flex-col items-center text-center overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-indigo-500/10 blur-[120px] rounded-full -z-10" />
        <h1 className="text-6xl md:text-7xl font-extrabold tracking-tighter mb-8 max-w-4xl bg-gradient-to-b from-slate-900 to-slate-500 bg-clip-text text-transparent">
          Turn your meeting recordings into <span className="text-indigo-600">Actionable Intelligence</span>
        </h1>
        <p className="text-xl text-slate-600 max-w-2xl mb-10 leading-relaxed">
          The all-in-one AI Meeting Assistant that transcribes, summarizes, and extracts action items with professional precision.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link href="/dashboard">
            <Button size="lg" className="h-14 px-8 text-lg bg-indigo-600 hover:bg-indigo-700 text-white rounded-full gap-2 shadow-lg shadow-indigo-500/25">
              Launch Dashboard <ArrowRight size={20} />
            </Button>
          </Link>
          <Button variant="outline" size="lg" className="h-14 px-8 text-lg rounded-full gap-2 border-slate-200">
            <Github size={20} /> View on GitHub
          </Button>
        </div>

        {/* Mockup Preview */}
        <div className="mt-20 w-full max-w-6xl p-4 bg-white/50 backdrop-blur-xl border rounded-2xl shadow-2xl">
          <div className="bg-slate-900 rounded-xl aspect-video flex items-center justify-center overflow-hidden border border-slate-800">
             <div className="text-slate-400 font-mono">Interactive Dashboard Preview</div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24 px-8 bg-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
          <FeatureCard 
            icon={<Zap className="text-indigo-600" />}
            title="Instant Transcription"
            description="Powered by Whisper, our transcription engine supports 50+ languages with industry-leading accuracy."
          />
          <FeatureCard 
            icon={<ShieldCheck className="text-emerald-600" />}
            title="Enterprise Security"
            description="SOC2 compliant infrastructure with AES-256 encryption for all your sensitive meeting data."
          />
          <FeatureCard 
            icon={<BarChart3 className="text-violet-600" />}
            title="Actionable Analytics"
            description="Extract sentiment, decisions, and tasks. Sync them directly with your CRM and Project Management tools."
          />
        </div>
      </section>

      {/* Footer */}
      <footer className="relative mt-auto border-t border-slate-100 bg-slate-950 overflow-hidden">
        {/* Background glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-900/20 via-slate-950 to-slate-950 pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-8 py-12 flex flex-col items-center gap-6">

          {/* Logo mark */}
          <div className="flex items-center gap-2 opacity-60">
            <div className="h-6 w-6 bg-indigo-600 rounded-md flex items-center justify-center">
              <Zap className="text-white" size={13} />
            </div>
            <span className="text-slate-400 text-sm font-semibold tracking-widest uppercase">MeetingAI</span>
          </div>

          {/* Divider with sparkle */}
          <div className="flex items-center gap-3 w-full max-w-sm">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent to-indigo-500/40" />
            <Sparkles size={14} className="text-indigo-400" />
            <div className="flex-1 h-px bg-gradient-to-l from-transparent to-indigo-500/40" />
          </div>

          {/* Signature */}
          <div className="flex flex-col items-center gap-1 text-center">
            <p className="text-xs text-slate-600 uppercase tracking-[0.2em] font-medium">Crafted with curiosity &amp; code by</p>
            <p className="text-2xl font-extrabold tracking-tight bg-gradient-to-r from-indigo-400 via-violet-400 to-pink-400 bg-clip-text text-transparent">
              Mridul Sharma
            </p>
            <p className="text-xs text-slate-600 mt-1">© {new Date().getFullYear()} · All rights reserved</p>
          </div>

        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description }: any) {
  return (
    <div className="p-8 rounded-2xl border border-slate-100 hover:border-indigo-100 transition-all hover:shadow-xl group">
      <div className="h-12 w-12 rounded-xl bg-slate-50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-4">{title}</h3>
      <p className="text-slate-600 leading-relaxed">{description}</p>
    </div>
  );
}
