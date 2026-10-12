"use client";

import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import {
  Bell,
  Mail,
  Send,
  Loader2,
  AlertTriangle,
  CheckCircle2,
  X,
  Radio,
} from "lucide-react";
import { AdminService } from "@/services/admin.service";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface BroadcastComposerModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTab?: "NOTIFICATION" | "EMAIL";
}

export function BroadcastComposerModal({
  isOpen,
  onClose,
  defaultTab = "NOTIFICATION",
}: BroadcastComposerModalProps) {
  const [activeTab, setActiveTab] = useState<"NOTIFICATION" | "EMAIL">(defaultTab);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [subject, setSubject] = useState("");
  const [emailMessage, setEmailMessage] = useState("");
  const [notificationType, setNotificationType] = useState("SYSTEM");
  const [showConfirm, setShowConfirm] = useState(false);

  // TanStack mutation for Broadcast In-App Notification
  const broadcastMutation = useMutation({
    mutationFn: AdminService.broadcastNotification,
    onSuccess: (res: any) => {
      const sentCount = res?.data?.totalSent ?? "all";
      toast.success(`Broadcast delivered to ${sentCount} active users!`);
      setTitle("");
      setMessage("");
      setShowConfirm(false);
      onClose();
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || err.message || "Failed to broadcast notification");
      setShowConfirm(false);
    },
  });

  // TanStack mutation for Bulk Email
  const emailMutation = useMutation({
    mutationFn: AdminService.sendBulkEmail,
    onSuccess: (res: any) => {
      const count = res?.data?.totalQueued ?? "all";
      toast.success(`Bulk announcement email queued for ${count} users!`);
      setSubject("");
      setEmailMessage("");
      setShowConfirm(false);
      onClose();
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || err.message || "Failed to send bulk email");
      setShowConfirm(false);
    },
  });

  if (!isOpen) return null;

  const isNotif = activeTab === "NOTIFICATION";
  const currentTitle = isNotif ? title : subject;
  const currentMessage = isNotif ? message : emailMessage;
  const isPending = broadcastMutation.isPending || emailMutation.isPending;

  const handleSend = () => {
    if (isNotif) {
      if (!title.trim() || !message.trim()) {
        toast.error("Please enter both title and notification message");
        return;
      }
      broadcastMutation.mutate({
        title: title.trim(),
        message: message.trim(),
        type: notificationType,
      });
    } else {
      if (!subject.trim() || !emailMessage.trim()) {
        toast.error("Please enter both email subject and message");
        return;
      }
      emailMutation.mutate({
        subject: subject.trim(),
        message: emailMessage.trim(),
      });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white dark:bg-[#111D15] border border-border/20 rounded-2xl w-full max-w-xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="p-5 border-b border-border/10 flex items-center justify-between bg-black/[0.02] dark:bg-black/20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#1C3627]/10 dark:bg-[#A3B18A]/10 text-[#1C3627] dark:text-[#A3B18A] flex items-center justify-center font-bold">
              <Radio className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h2 className="text-base font-bold text-foreground">Platform Announcements</h2>
              <p className="text-xs text-muted-foreground">Broadcast messages or send bulk updates to registered users</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex border-b border-border/10 px-5 pt-3 gap-4">
          <button
            onClick={() => {
              setActiveTab("NOTIFICATION");
              setShowConfirm(false);
            }}
            className={`pb-3 text-xs font-semibold flex items-center gap-2 border-b-2 transition-colors ${
              activeTab === "NOTIFICATION"
                ? "border-[#1C3627] dark:border-[#A3B18A] text-[#1C3627] dark:text-[#A3B18A]"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            <Bell className="w-4 h-4" />
            In-App Notification
          </button>
          <button
            onClick={() => {
              setActiveTab("EMAIL");
              setShowConfirm(false);
            }}
            className={`pb-3 text-xs font-semibold flex items-center gap-2 border-b-2 transition-colors ${
              activeTab === "EMAIL"
                ? "border-[#1C3627] dark:border-[#A3B18A] text-[#1C3627] dark:text-[#A3B18A]"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            <Mail className="w-4 h-4" />
            Bulk Email Announcement
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-4">
          {activeTab === "NOTIFICATION" ? (
            <>
              <div className="space-y-1.5">
                <div className="flex justify-between items-center">
                  <Label className="text-xs font-semibold text-foreground">Notification Title</Label>
                  <span className="text-[11px] text-muted-foreground">{title.length}/100</span>
                </div>
                <Input
                  value={title}
                  maxLength={100}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Scheduled System Upgrade"
                  className="rounded-xl"
                />
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs font-semibold text-foreground">Notification Category</Label>
                <select
                  value={notificationType}
                  onChange={(e) => setNotificationType(e.target.value)}
                  className="w-full h-10 px-3 rounded-xl border border-border/20 bg-background text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-[#1C3627] dark:focus:ring-[#A3B18A]"
                >
                  <option value="SYSTEM">System Announcement</option>
                  <option value="UPDATE">Product Update</option>
                  <option value="ALERT">Important Notice</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between items-center">
                  <Label className="text-xs font-semibold text-foreground">Message Body</Label>
                  <span className="text-[11px] text-muted-foreground">{message.length}/500</span>
                </div>
                <Textarea
                  value={message}
                  maxLength={500}
                  rows={4}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type your broadcast message visible in every user's notification feed..."
                  className="rounded-xl resize-none"
                />
              </div>
            </>
          ) : (
            <>
              <div className="space-y-1.5">
                <div className="flex justify-between items-center">
                  <Label className="text-xs font-semibold text-foreground">Email Subject</Label>
                  <span className="text-[11px] text-muted-foreground">{subject.length}/120</span>
                </div>
                <Input
                  value={subject}
                  maxLength={120}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="e.g. Exciting New Features in Next Job Track!"
                  className="rounded-xl"
                />
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between items-center">
                  <Label className="text-xs font-semibold text-foreground">Email Content</Label>
                  <span className="text-[11px] text-muted-foreground">{emailMessage.length}/2000</span>
                </div>
                <Textarea
                  value={emailMessage}
                  maxLength={2000}
                  rows={6}
                  onChange={(e) => setEmailMessage(e.target.value)}
                  placeholder="Compose HTML or plain text email message for all platform users..."
                  className="rounded-xl resize-none"
                />
              </div>
            </>
          )}

          {/* Real-time Preview Banner */}
          {currentTitle || currentMessage ? (
            <div className="p-4 rounded-xl border border-dashed border-[#1C3627]/30 dark:border-[#A3B18A]/30 bg-[#1C3627]/5 dark:bg-[#A3B18A]/5 space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#1C3627] dark:text-[#A3B18A]">
                Live Preview ({isNotif ? "In-App Bell" : "Email Template"})
              </span>
              <h4 className="text-xs font-semibold text-foreground">{currentTitle || "Untitled Announcement"}</h4>
              <p className="text-xs text-muted-foreground whitespace-pre-wrap">{currentMessage || "No description written yet..."}</p>
            </div>
          ) : null}

          {/* Confirmation Warning if triggered */}
          {showConfirm && (
            <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-700 dark:text-amber-400 text-xs flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5 text-amber-600 dark:text-amber-400" />
              <div>
                <p className="font-semibold">Confirm Broadcast Execution</p>
                <p className="mt-0.5 text-[11px] opacity-90">
                  This action will dispatch to <strong>all registered users</strong> on Next Job Track immediately.
                  Are you sure you want to proceed?
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-5 border-t border-border/10 flex items-center justify-end gap-3 bg-black/[0.02] dark:bg-black/20">
          <Button variant="outline" onClick={onClose} disabled={isPending} className="rounded-xl">
            Cancel
          </Button>

          {showConfirm ? (
            <Button
              onClick={handleSend}
              disabled={isPending}
              className="bg-amber-600 hover:bg-amber-700 text-white rounded-xl gap-2 font-semibold"
            >
              {isPending ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Sending Broadcast...
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  Yes, Dispatch to All Users
                </>
              )}
            </Button>
          ) : (
            <Button
              onClick={() => {
                if (isNotif) {
                  if (!title.trim() || !message.trim()) {
                    toast.error("Please enter both title and notification message");
                    return;
                  }
                } else {
                  if (!subject.trim() || !emailMessage.trim()) {
                    toast.error("Please enter both email subject and message");
                    return;
                  }
                }
                setShowConfirm(true);
              }}
              className="bg-[#1C3627] hover:bg-[#1C3627]/90 text-white dark:bg-[#A3B18A] dark:hover:bg-[#A3B18A]/90 dark:text-[#1C3627] rounded-xl gap-2 font-semibold shadow-lg shadow-[#1C3627]/20"
            >
              <Send className="w-4 h-4" />
              Dispatch Announcement
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
