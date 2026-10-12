"use client";

import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  Users,
  UserCheck,
  UserX,
  Briefcase,
  TrendingUp,
  Radio,
  FileSpreadsheet,
  Headphones,
  ShieldCheck,
  ArrowRight,
  Loader2,
  RefreshCw,
  Activity,
  History,
} from "lucide-react";
import { AdminService } from "@/services/admin.service";
import { BroadcastComposerModal } from "@/components/admin/BroadcastComposerModal";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

export function AdminDashboardOverview() {
  const [isComposerOpen, setIsComposerOpen] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  const {
    data: statsRes,
    isLoading,
    refetch,
    isRefetching,
  } = useQuery({
    queryKey: ["admin-dashboard-stats"],
    queryFn: AdminService.getDashboardStats,
  });

  const stats = statsRes?.data || {
    users: { total: 0, active: 0, suspended: 0 },
    jobApplications: { totalTracked: 0, totalOffers: 0, successRate: "0.00%" },
  };

  const handleExportCsv = async () => {
    try {
      setIsExporting(true);
      await AdminService.exportUsersCsv();
      toast.success("User dataset exported successfully to CSV!");
    } catch (err: any) {
      toast.error(err.message || "Failed to export user CSV");
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Top Banner / Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#1C3627]/10 dark:bg-[#A3B18A]/10 text-[#1C3627] dark:text-[#A3B18A] uppercase tracking-wider flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5" />
              Administrative Command Center
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
            Platform Overview & Intelligence
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground mt-1">
            Real-time analytics across all registered talent, job tracking volume, and platform operations.
          </p>
        </div>

        {/* Quick Actions */}
        <div className="flex flex-wrap items-center gap-2.5">
          <Button
            variant="outline"
            size="sm"
            onClick={() => refetch()}
            disabled={isLoading || isRefetching}
            className="rounded-xl text-xs h-9"
          >
            <RefreshCw className={`w-3.5 h-3.5 mr-1.5 ${isRefetching ? "animate-spin" : ""}`} />
            Refresh Stats
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={handleExportCsv}
            disabled={isExporting}
            className="rounded-xl text-xs h-9 border-[#1C3627]/20 hover:border-[#1C3627]/40"
          >
            {isExporting ? (
              <Loader2 className="w-3.5 h-3.5 mr-1.5 animate-spin" />
            ) : (
              <FileSpreadsheet className="w-3.5 h-3.5 mr-1.5 text-emerald-600 dark:text-emerald-400" />
            )}
            Export Users CSV
          </Button>

          <Button
            size="sm"
            onClick={() => setIsComposerOpen(true)}
            className="rounded-xl text-xs h-9 bg-[#1C3627] hover:bg-[#1C3627]/90 text-white dark:bg-[#A3B18A] dark:hover:bg-[#A3B18A]/90 dark:text-[#1C3627] font-semibold shadow-md shadow-[#1C3627]/10"
          >
            <Radio className="w-3.5 h-3.5 mr-1.5 animate-pulse" />
            Broadcast Announcement
          </Button>
        </div>
      </div>

      {/* 4 Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Users */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="p-5 rounded-2xl bg-white dark:bg-[#111D15] border border-border/20 shadow-sm relative overflow-hidden group hover:border-[#1C3627]/30 dark:hover:border-[#A3B18A]/30 transition-all"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Total Users
            </span>
            <div className="w-9 h-9 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-foreground">
            {isLoading ? <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" /> : stats.users.total}
          </div>
          <p className="text-[11px] text-muted-foreground mt-2 flex items-center gap-1.5">
            Registered talents & admins
          </p>
        </motion.div>

        {/* Active vs Suspended */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2, delay: 0.05 }}
          className="p-5 rounded-2xl bg-white dark:bg-[#111D15] border border-border/20 shadow-sm relative overflow-hidden group hover:border-[#1C3627]/30 dark:hover:border-[#A3B18A]/30 transition-all"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Active vs Suspended
            </span>
            <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <UserCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-extrabold text-foreground">
              {isLoading ? <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" /> : stats.users.active}
            </span>
            <span className="text-xs font-semibold text-muted-foreground">Active</span>
            <span className="text-xs text-muted-foreground/60">/</span>
            <span className="text-xs font-bold text-red-500 flex items-center gap-0.5">
              <UserX className="w-3 h-3" />
              {stats.users.suspended} Suspended
            </span>
          </div>
          <p className="text-[11px] text-muted-foreground mt-2">
            Health: {stats.users.total > 0 ? ((stats.users.active / stats.users.total) * 100).toFixed(1) : 100}% active
          </p>
        </motion.div>

        {/* Total Applications Tracked */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2, delay: 0.1 }}
          className="p-5 rounded-2xl bg-white dark:bg-[#111D15] border border-border/20 shadow-sm relative overflow-hidden group hover:border-[#1C3627]/30 dark:hover:border-[#A3B18A]/30 transition-all"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Applications Tracked
            </span>
            <div className="w-9 h-9 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center">
              <Briefcase className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-foreground">
            {isLoading ? (
              <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
            ) : (
              stats.jobApplications.totalTracked
            )}
          </div>
          <p className="text-[11px] text-muted-foreground mt-2">
            Total job opportunities organized
          </p>
        </motion.div>

        {/* Offer Success Rate */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2, delay: 0.15 }}
          className="p-5 rounded-2xl bg-white dark:bg-[#111D15] border border-border/20 shadow-sm relative overflow-hidden group hover:border-[#1C3627]/30 dark:hover:border-[#A3B18A]/30 transition-all"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Offer Success Rate
            </span>
            <div className="w-9 h-9 rounded-xl bg-[#1C3627]/10 dark:bg-[#A3B18A]/10 text-[#1C3627] dark:text-[#A3B18A] flex items-center justify-center">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-extrabold text-foreground">
              {isLoading ? (
                <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
              ) : (
                stats.jobApplications.successRate
              )}
            </span>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
              {stats.jobApplications.totalOffers} Offers
            </span>
          </div>
          <p className="text-[11px] text-muted-foreground mt-2">
            Converted into verified job offers
          </p>
        </motion.div>
      </div>

      {/* Module Jump Cards / Navigation */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* User Management */}
        <Link
          href="/dashboard/admin/users"
          className="p-5 rounded-2xl bg-white dark:bg-[#111D15] border border-border/20 hover:border-[#1C3627]/40 dark:hover:border-[#A3B18A]/40 transition-all group flex flex-col justify-between shadow-sm"
        >
          <div>
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-3">
              <Users className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-foreground group-hover:text-[#1C3627] dark:group-hover:text-[#A3B18A] transition-colors">
              User Management
            </h3>
            <p className="text-xs text-muted-foreground mt-1">
              Search, suspend or promote user accounts and inspect tracking stats.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-border/10 flex items-center text-xs font-semibold text-[#1C3627] dark:text-[#A3B18A]">
            Manage Users <ArrowRight className="w-3.5 h-3.5 ml-1 group-hover:translate-x-1 transition-transform" />
          </div>
        </Link>

        {/* Support Tickets */}
        <Link
          href="/dashboard/admin/support"
          className="p-5 rounded-2xl bg-white dark:bg-[#111D15] border border-border/20 hover:border-[#1C3627]/40 dark:hover:border-[#A3B18A]/40 transition-all group flex flex-col justify-between shadow-sm"
        >
          <div>
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center mb-3">
              <Headphones className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-foreground group-hover:text-[#1C3627] dark:group-hover:text-[#A3B18A] transition-colors">
              Support Operations
            </h3>
            <p className="text-xs text-muted-foreground mt-1">
              Review user inquiries, resolve issues, and update ticket lifecycle.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-border/10 flex items-center text-xs font-semibold text-[#1C3627] dark:text-[#A3B18A]">
            Open Support Queue <ArrowRight className="w-3.5 h-3.5 ml-1 group-hover:translate-x-1 transition-transform" />
          </div>
        </Link>

        {/* Announcements & Comms */}
        <Link
          href="/dashboard/admin/communications"
          className="p-5 rounded-2xl bg-white dark:bg-[#111D15] border border-border/20 hover:border-[#1C3627]/40 dark:hover:border-[#A3B18A]/40 transition-all group flex flex-col justify-between shadow-sm"
        >
          <div>
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center mb-3">
              <Radio className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-foreground group-hover:text-[#1C3627] dark:group-hover:text-[#A3B18A] transition-colors">
              Announcements
            </h3>
            <p className="text-xs text-muted-foreground mt-1">
              Dispatch in-app notifications and send bulk announcement emails.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-border/10 flex items-center text-xs font-semibold text-[#1C3627] dark:text-[#A3B18A]">
            Compose Broadcast <ArrowRight className="w-3.5 h-3.5 ml-1 group-hover:translate-x-1 transition-transform" />
          </div>
        </Link>

        {/* Security Audit Logs */}
        <Link
          href="/dashboard/admin/audit-logs"
          className="p-5 rounded-2xl bg-white dark:bg-[#111D15] border border-border/20 hover:border-[#1C3627]/40 dark:hover:border-[#A3B18A]/40 transition-all group flex flex-col justify-between shadow-sm"
        >
          <div>
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-3">
              <History className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-foreground group-hover:text-[#1C3627] dark:group-hover:text-[#A3B18A] transition-colors">
              Security Audit Logs
            </h3>
            <p className="text-xs text-muted-foreground mt-1">
              Monitor logins, role escalations, status changes, and IP addresses.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-border/10 flex items-center text-xs font-semibold text-[#1C3627] dark:text-[#A3B18A]">
            Audit Trail <ArrowRight className="w-3.5 h-3.5 ml-1 group-hover:translate-x-1 transition-transform" />
          </div>
        </Link>
      </div>

      {/* Broadcast Composer Modal */}
      <BroadcastComposerModal
        isOpen={isComposerOpen}
        onClose={() => setIsComposerOpen(false)}
      />
    </div>
  );
}
