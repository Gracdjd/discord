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

const MembersModal = () => {
  const { isOpen, onOpen, onClose, type, data } = useModal();
  const { server } = data;
  const isModalOpen = isOpen && type === "members";

  return (
    <div>
      <Dialog open={isModalOpen} onOpenChange={onClose}>
        <DialogContent className="bg-white text-black p-0 overflow-hidden">
          <DialogHeader className="px-6 pt-8">
            <DialogTitle className="text-2xl text-center font-bold">
              Manage Members
            </DialogTitle>
          </DialogHeader>
        </DialogContent>
        <DialogDescription>{server?.members?.length} Members</DialogDescription>
        <div className="p-6">hello members</div>
      </Dialog>
    </div>
  );
};

export default MembersModal;
