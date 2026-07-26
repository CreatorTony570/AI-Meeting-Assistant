"use client"

import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ProviderSelector } from "@/components/meetings/ProviderSelector";
import { 
  Mic, 
  FileText, 
  CheckCircle2, 
  Clock, 
  TrendingUp, 
  Plus, 
  Search,
  LayoutDashboard,
  Settings,
  LogOut,
  Upload
} from "lucide-react";

import { UsageChart } from "@/components/analytics/UsageChart";

export default function Dashboard() {
  // ... rest of dashboard code
  return (
    // ... inside dashboard layout
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <Card className="lg:col-span-2 border-none shadow-sm ring-1 ring-slate-200">
        <CardHeader>
          <CardTitle>Meeting Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <UsageChart />
        </CardContent>
      </Card>
      {/* ... other cards */}
    </div>
  )
}

function StatCard({ title, value, icon, change }: any) {
  return (
    <Card className="border-none shadow-sm ring-1 ring-slate-200">
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div className="p-2 bg-slate-50 rounded-lg">{icon}</div>
          <span className={`text-xs font-medium ${change.startsWith('+') ? 'text-emerald-600' : 'text-slate-500'}`}>
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

function MeetingItem() {
  return (
    <div className="flex items-center justify-between p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 hover:shadow-md transition-shadow cursor-pointer">
      <div className="flex items-center gap-4">
        <div className="h-12 w-12 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600">
          <Mic size={24} />
        </div>
        <div>
          <h4 className="font-semibold text-slate-900">Weekly Product Sync</h4>
          <p className="text-sm text-slate-500">Yesterday at 2:30 PM • 45 mins</p>
        </div>
      </div>
      <div className="flex items-center gap-6">
        <div className="px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-medium rounded-full">
          Processed
        </div>
        <Button variant="ghost" size="sm">Details</Button>
      </div>
    </div>
  );
}
