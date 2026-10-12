"use client";

import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import {
  Radio,
  Bell,
  Mail,
  Send,
  Loader2,
  AlertTriangle,
  CheckCircle2,
  Users,
  ShieldCheck,
} from "lucide-react";
import { AdminService } from "@/services/admin.service";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export function AdminCommunicationsContent() {
  const [activeTab, setActiveTab] = useState<"NOTIFICATION" | "EMAIL">("NOTIFICATION");

  // In-App Notification form state
  const [notifTitle, setNotifTitle] = useState("");
  const [notifMessage, setNotifMessage] = useState("");
  const [notifType, setNotifType] = useState("SYSTEM");

  // Bulk Email form state
  const [emailSubject, setEmailSubject] = useState("");
  const [emailMessage, setEmailMessage] = useState("");

  const [confirmDialog, setConfirmDialog] = useState(false);

  // TanStack mutation for In-App Broadcast
  const broadcastMutation = useMutation({
    mutationFn: AdminService.broadcastNotification,
    onSuccess: (res: any) => {
      const sent = res?.data?.totalSent ?? "all";
      toast.success(`Broadcast successfully sent to ${sent} users!`);
      setNotifTitle("");
      setNotifMessage("");
      setConfirmDialog(false);
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || err.message || "Failed to broadcast notification");
      setConfirmDialog(false);
    },
  });

  // TanStack mutation for Bulk Email
  const emailMutation = useMutation({
    mutationFn: AdminService.sendBulkEmail,
    onSuccess: (res: any) => {
      const queued = res?.data?.totalQueued ?? "all";
      toast.success(`Bulk email announcement queued for ${queued} recipients!`);
      setEmailSubject("");
      setEmailMessage("");
      setConfirmDialog(false);
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || err.message || "Failed to dispatch bulk email");
      setConfirmDialog(false);
    },
  });

  const isPending = broadcastMutation.isPending || emailMutation.isPending;
  const isNotif = activeTab === "NOTIFICATION";

  const handleDispatch = () => {
    if (isNotif) {
      if (!notifTitle.trim() || !notifMessage.trim()) {
        toast.error("Please fill in notification title and message.");
        return;
      }
      broadcastMutation.mutate({
        title: notifTitle.trim(),
        message: notifMessage.trim(),
        type: notifType,
      });
    } else {
      if (!emailSubject.trim() || !emailMessage.trim()) {
        toast.error("Please fill in email subject and content.");
        return;
      }
      emailMutation.mutate({
        subject: emailSubject.trim(),
        message: emailMessage.trim(),
      });
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-500/10 text-amber-600 dark:text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
            <Radio className="w-3.5 h-3.5 animate-pulse" />
            Bulk Communication Hub
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
          Announcements & Broadcasts
        </h1>
        <p className="text-xs sm:text-sm text-muted-foreground mt-1">
          Deliver urgent notices, feature updates, or scheduled maintenance broadcasts to all platform members.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: Composer Card */}
        <div className="lg:col-span-2 bg-white dark:bg-[#111D15] border border-border/20 rounded-2xl shadow-sm p-6 sm:p-8 space-y-6">
          {/* Tab Selector */}
          <div className="flex border-b border-border/10 pb-3 gap-6">
            <button
              onClick={() => {
                setActiveTab("NOTIFICATION");
                setConfirmDialog(false);
              }}
              className={`pb-3 text-xs sm:text-sm font-bold flex items-center gap-2 border-b-2 transition-all ${
                isNotif
                  ? "border-[#1C3627] dark:border-[#A3B18A] text-[#1C3627] dark:text-[#A3B18A]"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              <Bell className="w-4 h-4" />
              In-App Notification Feed
            </button>
            <button
              onClick={() => {
                setActiveTab("EMAIL");
                setConfirmDialog(false);
              }}
              className={`pb-3 text-xs sm:text-sm font-bold flex items-center gap-2 border-b-2 transition-all ${
                !isNotif
                  ? "border-[#1C3627] dark:border-[#A3B18A] text-[#1C3627] dark:text-[#A3B18A]"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              <Mail className="w-4 h-4" />
              Bulk Email Campaign
            </button>
          </div>

          {/* Form Content */}
          {isNotif ? (
            <div className="space-y-4">
              <div className="space-y-1.5">
                <div className="flex justify-between items-center">
                  <Label className="text-xs font-semibold text-foreground">Notice Title</Label>
                  <span className="text-[11px] text-muted-foreground">{notifTitle.length}/100</span>
                </div>
                <Input
                  value={notifTitle}
                  maxLength={100}
                  onChange={(e) => setNotifTitle(e.target.value)}
                  placeholder="e.g. Scheduled Maintenance Notice"
                  className="rounded-xl h-11"
                />
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs font-semibold text-foreground">Notification Category</Label>
                <select
                  value={notifType}
                  onChange={(e) => setNotifType(e.target.value)}
                  className="w-full h-11 px-3 rounded-xl border border-border/20 bg-background text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-[#1C3627] dark:focus:ring-[#A3B18A]"
                >
                  <option value="SYSTEM">System Announcement</option>
                  <option value="UPDATE">Product Feature Update</option>
                  <option value="ALERT">Critical Security Notice</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between items-center">
                  <Label className="text-xs font-semibold text-foreground">Notification Message</Label>
                  <span className="text-[11px] text-muted-foreground">{notifMessage.length}/500</span>
                </div>
                <Textarea
                  value={notifMessage}
                  maxLength={500}
                  rows={5}
                  onChange={(e) => setNotifMessage(e.target.value)}
                  placeholder="We will undergo 30 minutes of system maintenance tonight at 2 AM UTC."
                  className="rounded-xl resize-none"
                />
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="space-y-1.5">
                <div className="flex justify-between items-center">
                  <Label className="text-xs font-semibold text-foreground">Email Subject Line</Label>
                  <span className="text-[11px] text-muted-foreground">{emailSubject.length}/120</span>
                </div>
                <Input
                  value={emailSubject}
                  maxLength={120}
                  onChange={(e) => setEmailSubject(e.target.value)}
                  placeholder="e.g. Exciting New Features in Next Job Track!"
                  className="rounded-xl h-11"
                />
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between items-center">
                  <Label className="text-xs font-semibold text-foreground">Email Body</Label>
                  <span className="text-[11px] text-muted-foreground">{emailMessage.length}/2000</span>
                </div>
                <Textarea
                  value={emailMessage}
                  maxLength={2000}
                  rows={8}
                  onChange={(e) => setEmailMessage(e.target.value)}
                  placeholder="We have launched AI resume parsing and interview analytics for all users..."
                  className="rounded-xl resize-none"
                />
              </div>
            </div>
          )}

          {/* Warning before send */}
          {confirmDialog && (
            <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-700 dark:text-amber-400 text-xs flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5 text-amber-600 dark:text-amber-400" />
              <div>
                <p className="font-semibold">Confirm Immediate Broadcast</p>
                <p className="mt-0.5 text-[11px] opacity-90">
                  This announcement will immediately reach <strong>all active users</strong> on the platform.
                  Ensure content accuracy before proceeding.
                </p>
              </div>
            </div>
          )}

          {/* Action Button */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-border/10">
            {confirmDialog ? (
              <>
                <Button
                  variant="outline"
                  onClick={() => setConfirmDialog(false)}
                  disabled={isPending}
                  className="rounded-xl"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleDispatch}
                  disabled={isPending}
                  className="bg-amber-600 hover:bg-amber-700 text-white rounded-xl gap-2 font-semibold"
                >
                  {isPending ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="w-4 h-4" />
                      Confirm & Send Broadcast
                    </>
                  )}
                </Button>
              </>
            ) : (
              <Button
                onClick={() => {
                  if (isNotif) {
                    if (!notifTitle.trim() || !notifMessage.trim()) {
                      toast.error("Please fill in notification title and message.");
                      return;
                    }
                  } else {
                    if (!emailSubject.trim() || !emailMessage.trim()) {
                      toast.error("Please fill in email subject and content.");
                      return;
                    }
                  }
                  setConfirmDialog(true);
                }}
                className="bg-[#1C3627] hover:bg-[#1C3627]/90 text-white dark:bg-[#A3B18A] dark:hover:bg-[#A3B18A]/90 dark:text-[#1C3627] rounded-xl gap-2 font-bold px-6 h-11 shadow-lg shadow-[#1C3627]/20"
              >
                <Send className="w-4 h-4" />
                Dispatch Announcement
              </Button>
            )}
          </div>
        </div>

        {/* Right: Live Preview Panel */}
        <div className="space-y-4">
          <div className="bg-white dark:bg-[#111D15] border border-border/20 rounded-2xl shadow-sm p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-border/10">
              <span className="text-xs font-bold uppercase tracking-wider text-[#1C3627] dark:text-[#A3B18A] flex items-center gap-1.5">
                <Radio className="w-3.5 h-3.5" />
                Live Preview
              </span>
              <span className="text-[11px] text-muted-foreground">User Perspective</span>
            </div>

            {isNotif ? (
              <div className="p-4 rounded-xl bg-black/5 dark:bg-black/20 border border-border/10 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400">
                    {notifType}
                  </span>
                  <span className="text-[10px] text-muted-foreground">Just now</span>
                </div>
                <h4 className="text-sm font-bold text-foreground">
                  {notifTitle || "Notification Title Preview"}
                </h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {notifMessage || "The notification message description will render in this card inside every user's dashboard notification center."}
                </p>
              </div>
            ) : (
              <div className="p-4 rounded-xl bg-black/5 dark:bg-black/20 border border-border/10 space-y-3">
                <div className="text-[11px] text-muted-foreground border-b border-border/10 pb-2">
                  <strong>Subject:</strong> {emailSubject || "Next Job Track Announcement"}
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed whitespace-pre-wrap">
                  {emailMessage || "Your bulk email announcement body will appear here formatted for desktop and mobile mail clients."}
                </p>
              </div>
            )}
          </div>

          <div className="p-5 rounded-2xl bg-[#1C3627]/5 dark:bg-[#A3B18A]/5 border border-[#1C3627]/10 dark:border-[#A3B18A]/10 space-y-2">
            <h4 className="text-xs font-bold text-foreground flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#1C3627] dark:text-[#A3B18A]" />
              Security & Compliance Note
            </h4>
            <p className="text-[11px] text-muted-foreground leading-relaxed">
              All broadcasts are logged into the security audit ledger. Emails are queued and delivered via background workers to avoid SMTP throttling.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
