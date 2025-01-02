"use client";
import {
  DialogHeader,
  DialogContent,
  DialogDescription,
  DialogTitle,
  Dialog,
  DialogFooter,
} from "../ui/dialog";

import { useModal } from "@/hooks/use-modal-store";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Check, Copy, RefreshCcw } from "lucide-react";
import useOrigin from "@/hooks/use-origin";
import { useState, useEffect } from "react";
import axios from "axios";

const InviteModal = () => {
  const { isOpen, onOpen, onClose, type, data } = useModal();
  const isModalOpen = isOpen && type === "invite";

  const origin = useOrigin();
  const { server } = data;

  const inviteUrl = `${origin}/invite/${server?.inviteCode}`;
  const [copied, setCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const onCopy = () => {
    navigator.clipboard.writeText(inviteUrl);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 1000);
  };

  const onNew = async () => {
    try {
      setIsLoading(true);
      const res = await axios.patch(`/api/servers/${server?.id}/invite-code`);
      onOpen("invite", res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div>
      <Dialog open={isModalOpen} onOpenChange={onClose}>
        <DialogContent className="bg-white text-black p-0 overflow-hidden">
          <DialogHeader className="px-6 pt-8">
            <DialogTitle className="text-2xl text-center font-bold">
              Invite Friend
            </DialogTitle>
          </DialogHeader>
          <div className="p-6">
            <Label className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70">
              Server invite link
            </Label>
            <div className="flex items-center mt-2 gap-x-2">
              <Input
                disabled={isLoading}
                className="bg-zinc-300/50 border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                value={inviteUrl}
              />
              <Button size="icon" onClick={onCopy} disabled={isLoading}>
                {copied ? <Check size={16} /> : <Copy className="w-4 h-4" />}
              </Button>
            </div>
            <Button
              onClick={onNew}
              disabled={isLoading}
              variant="link"
              size="sm"
              className="text-xs text-zinc-500 mt-4"
            >
              Generate a new Link
              <RefreshCcw className="!w-3 h-3 ml-1" />
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default InviteModal;
