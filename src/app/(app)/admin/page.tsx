"use client";

import { Users, Activity, Flag, PieChart, TrendingUp, ShieldAlert } from "lucide-react";

export default function AdminPage() {
  return (
    <div className="flex flex-col gap-10 pb-24 pt-8 px-6 max-w-4xl mx-auto w-full min-h-full">
      {/* Header */}
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">Admin Dashboard</h1>
          <p className="text-slate-500 mt-1 text-sm font-medium">Community & network moderation.</p>
        </div>
      </header>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 gap-4">
        {[
          { label: "Verified Users", value: "2,843", icon: Users, color: "text-blue-500", bg: "bg-blue-50", border: "border-blue-100" },
          { label: "Active Now", value: "842", icon: Activity, color: "text-green-500", bg: "bg-green-50", border: "border-green-100" },
          { label: "Reports", value: "3", icon: Flag, color: "text-red-500", bg: "bg-red-50", border: "border-red-100" },
          { label: "Pending Auth", value: "14", icon: ShieldAlert, color: "text-amber-500", bg: "bg-amber-50", border: "border-amber-100" },
        ].map((stat, i) => (
          <div key={i} className={`border p-5 rounded-2xl flex flex-col gap-3 shadow-sm ${stat.bg} ${stat.border}`}>
            <stat.icon className={`w-5 h-5 ${stat.color}`} />
            <div>
              <div className="text-2xl font-bold text-slate-900 tracking-tight">{stat.value}</div>
              <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mt-1">{stat.label}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-8">
        {/* Insights */}
        <section className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
          <h2 className="text-sm font-bold flex items-center gap-2 mb-6 uppercase tracking-widest text-slate-800">
            <PieChart className="w-4 h-4 text-indigo-500" />
            Community Insights
          </h2>
          
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold uppercase tracking-wider text-slate-600">
                <span>Technology</span>
                <span className="text-indigo-600">32%</span>
              </div>
              <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-blue-500 w-[32%] rounded-full" />
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold uppercase tracking-wider text-slate-600">
                <span>Sports & Wellness</span>
                <span className="text-indigo-600">24%</span>
              </div>
              <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-green-500 w-[24%] rounded-full" />
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold uppercase tracking-wider text-slate-600">
                <span>Food & Baking</span>
                <span className="text-indigo-600">18%</span>
              </div>
              <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-amber-500 w-[18%] rounded-full" />
              </div>
            </div>
          </div>
          
          <div className="mt-8 p-4 bg-indigo-50 rounded-xl border border-indigo-100">
            <div className="flex items-start gap-3">
              <TrendingUp className="w-5 h-5 text-indigo-600 mt-0.5" />
              <p className="text-sm text-slate-700 leading-relaxed font-medium">
                <span className="font-bold text-indigo-700 uppercase text-[10px] tracking-widest mr-2">LOG:</span> 
                Sports participation increased by 15% this week. Advise creating a community event.
              </p>
            </div>
          </div>
        </section>

        {/* Moderation */}
        <section className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
          <h2 className="text-sm font-bold flex items-center gap-2 mb-6 uppercase tracking-widest text-slate-800">
            <ShieldAlert className="w-4 h-4 text-red-500" />
            Moderation Queue
          </h2>
          
          <div className="space-y-4">
            {[
              { type: "Spam Posting", user: "Apt 204", time: "2 hours ago" },
              { type: "Inappropriate Content", user: "Apt 501", time: "5 hours ago" },
            ].map((report, i) => (
              <div key={i} className="flex items-center justify-between p-4 rounded-xl border border-red-100 bg-red-50">
                <div>
                  <div className="font-bold text-xs uppercase tracking-wider text-red-600">{report.type}</div>
                  <div className="text-[11px] font-medium text-red-400 mt-1 uppercase tracking-wider">Source: {report.user} · {report.time}</div>
                </div>
                <button className="text-[11px] uppercase tracking-wider font-bold bg-white text-red-600 border border-red-200 px-3 py-1.5 rounded-lg hover:bg-red-50 transition-colors shadow-sm">
                  Review
                </button>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
