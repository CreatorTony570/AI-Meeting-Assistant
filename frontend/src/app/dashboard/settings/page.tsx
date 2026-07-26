"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Brain, Zap, Globe, KeyRound, Cpu, CheckCircle2, AlertCircle, Eye, EyeOff } from "lucide-react";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000/api/v1";

const PROVIDERS: Record<string, { label: string; icon: React.ReactNode; models: string[]; badge: string }> = {
  openai: {
    label: "OpenAI",
    icon: <Brain className="text-emerald-500" size={16} />,
    models: ["gpt-4o", "gpt-4-turbo", "gpt-3.5-turbo"],
    badge: "Paid",
  },
  gemini: {
    label: "Google Gemini",
    icon: <Zap className="text-amber-500" size={16} />,
    models: ["gemini-1.5-pro", "gemini-1.5-flash", "gemini-pro"],
    badge: "Free / Paid",
  },
  openrouter: {
    label: "OpenRouter",
    icon: <Globe className="text-indigo-500" size={16} />,
    models: [
      "meta-llama/llama-3-70b-instruct",
      "mistralai/mistral-7b-instruct",
      "anthropic/claude-3-haiku",
    ],
    badge: "Flexible",
  },
};

export default function SettingsPage() {
  const [provider, setProvider] = useState("gemini");
  const [model, setModel] = useState("gemini-1.5-flash");
  const [apiKey, setApiKey] = useState("");
  const [showKey, setShowKey] = useState(false);
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [loading, setLoading] = useState(true);

  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const headers = { Authorization: `Bearer ${token}` };

  useEffect(() => {
    axios
      .get(`${API_URL}/settings/me`, { headers })
      .then((res) => {
        setProvider(res.data.ai_provider ?? "gemini");
        setModel(res.data.ai_model ?? "gemini-1.5-flash");
        setApiKey(res.data.encrypted_api_key ?? "");
      })
      .catch(() => {/* use defaults */})
      .finally(() => setLoading(false));
  }, []);

  // When provider changes, auto-select first model for that provider
  const handleProviderChange = (val: string) => {
    setProvider(val);
    setModel(PROVIDERS[val]?.models[0] ?? "");
  };

  const handleSave = async () => {
    setStatus("saving");
    try {
      await axios.put(
        `${API_URL}/settings/me`,
        { ai_provider: provider, ai_model: model, encrypted_api_key: apiKey },
        { headers }
      );
      setStatus("saved");
      setTimeout(() => setStatus("idle"), 3000);
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64 text-slate-400">
        Loading settings…
      </div>
    );
  }

  const currentProvider = PROVIDERS[provider];

  return (
    <div className="max-w-2xl mx-auto py-10 px-4 space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">AI Settings</h1>
        <p className="text-slate-500 text-sm mt-1">
          Choose your AI provider, model, and enter your API key. Keys are stored in the database and never exposed.
        </p>
      </div>

      {/* Provider */}
      <Card className="border-none shadow-sm ring-1 ring-slate-200">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Cpu size={16} className="text-indigo-500" /> AI Provider
          </CardTitle>
          <CardDescription>Select the AI service you want to use for analysis.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-3 gap-3">
            {Object.entries(PROVIDERS).map(([key, p]) => (
              <button
                key={key}
                onClick={() => handleProviderChange(key)}
                className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all text-sm font-medium
                  ${provider === key
                    ? "border-indigo-500 bg-indigo-50 text-indigo-700"
                    : "border-slate-200 hover:border-slate-300 text-slate-600"
                  }`}
              >
                {p.icon}
                <span>{p.label}</span>
                <span className="text-[10px] bg-slate-100 px-1.5 py-0.5 rounded text-slate-500">{p.badge}</span>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Model */}
      <Card className="border-none shadow-sm ring-1 ring-slate-200">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Brain size={16} className="text-emerald-500" /> Model
          </CardTitle>
          <CardDescription>Choose the model for the selected provider.</CardDescription>
        </CardHeader>
        <CardContent>
          <Select value={model} onValueChange={setModel}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a model" />
            </SelectTrigger>
            <SelectContent>
              {currentProvider?.models.map((m) => (
                <SelectItem key={m} value={m}>
                  {m}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {/* API Key */}
      <Card className="border-none shadow-sm ring-1 ring-slate-200">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <KeyRound size={16} className="text-amber-500" /> API Key
          </CardTitle>
          <CardDescription>
            Your key for <span className="font-semibold">{currentProvider?.label}</span>. Leave blank to use the server default (if configured).
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <input
              type={showKey ? "text" : "password"}
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder={`Enter your ${currentProvider?.label} API key…`}
              className="w-full px-4 py-2.5 pr-10 rounded-lg border border-slate-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 font-mono"
            />
            <button
              type="button"
              onClick={() => setShowKey((v) => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              {showKey ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
          <p className="text-xs text-slate-400 mt-2">
            {provider === "gemini" && "Get a free key at aistudio.google.com"}
            {provider === "openai" && "Get your key at platform.openai.com"}
            {provider === "openrouter" && "Get a free key at openrouter.ai"}
          </p>
        </CardContent>
      </Card>

      {/* Save */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm">
          {status === "saved" && <><CheckCircle2 size={16} className="text-emerald-500" /><span className="text-emerald-600">Settings saved!</span></>}
          {status === "error" && <><AlertCircle size={16} className="text-red-500" /><span className="text-red-600">Failed to save. Try again.</span></>}
        </div>
        <Button
          onClick={handleSave}
          disabled={status === "saving"}
          className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-full px-6"
        >
          {status === "saving" ? "Saving…" : "Save Settings"}
        </Button>
      </div>
    </div>
  );
}
