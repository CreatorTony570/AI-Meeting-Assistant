"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Mic,
  FileText,
  CheckCircle2,
  Clock,
  TrendingUp,
  Plus,
} from "lucide-react";
import { UsageChart } from "@/components/analytics/UsageChart";

export default function Dashboard() {
  return (
    <div className="p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-slate-500 text-sm mt-1">Welcome back. Here&apos;s your meeting overview.</p>
          </div>
          <Button className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-full gap-2">
            <Plus size={16} /> New Meeting
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard title="Total Meetings" value="24" icon={<Mic size={18} className="text-indigo-500" />} change="+4 this week" />
          <StatCard title="Transcribed" value="22" icon={<FileText size={18} className="text-violet-500" />} change="+2 this week" />
          <StatCard title="Action Items" value="38" icon={<CheckCircle2 size={18} className="text-emerald-500" />} change="+8 this week" />
          <StatCard title="Avg Duration" value="34m" icon={<Clock size={18} className="text-amber-500" />} change="–2m vs last week" />
        </div>

        {/* Chart */}
        <Card className="border-none shadow-sm ring-1 ring-slate-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <TrendingUp size={16} className="text-indigo-500" /> Meeting Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <UsageChart />
          </CardContent>
        </Card>

        {/* Recent meetings */}
        <Card className="border-none shadow-sm ring-1 ring-slate-200">
          <CardHeader>
            <CardTitle className="text-base">Recent Meetings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <MeetingItem title="Weekly Product Sync" time="Yesterday at 2:30 PM • 45 mins" />
            <MeetingItem title="Q3 Planning Session" time="2 days ago • 1h 12 mins" />
            <MeetingItem title="Design Review" time="3 days ago • 28 mins" />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon, change }: { title: string; value: string; icon: React.ReactNode; change: string }) {
  return (
    <Card className="border-none shadow-sm ring-1 ring-slate-200">
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div className="p-2 bg-slate-50 rounded-lg">{icon}</div>
          <span className={`text-xs font-medium ${change.startsWith("+") ? "text-emerald-600" : "text-slate-500"}`}>
            {change}
          </span>
        </div>
        <div className="mt-4">
          <p className="text-sm text-slate-500 font-medium">{title}</p>
          <h3 className="text-2xl font-bold mt-1">{value}</h3>
        </div>
      </CardContent>
    </Card>
  );
}

function MeetingItem({ title, time }: { title: string; time: string }) {
  return (
    <div className="flex items-center justify-between p-4 bg-white rounded-xl border border-slate-100 hover:shadow-md transition-shadow cursor-pointer">
      <div className="flex items-center gap-4">
        <div className="h-10 w-10 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600">
          <Mic size={20} />
        </div>
        <div>
          <h4 className="font-semibold text-slate-900 text-sm">{title}</h4>
          <p className="text-xs text-slate-500">{time}</p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <span className="px-2.5 py-1 bg-emerald-50 text-emerald-700 text-xs font-medium rounded-full">Processed</span>
        <Button variant="ghost" size="sm" className="text-xs">Details</Button>
      </div>
    </div>
  );
}
