import { ServerWithMemberWithProfiles } from "@/types";
import { Channel, ChannelType } from "@prisma/client";
import { create } from "zustand";
export type ModalType =
  | "createServer"
  | "invite"
  | "editServer"
  | "members"
  | "createChannel"
  | "leaveServer"
  | "deleteServer"
  | "deleteChannel"
  | "editChannel"
  | "messageFile"
  | null;
interface ModalData {
  server?: ServerWithMemberWithProfiles;
  channelType?: ChannelType;
  channel?: Channel;
  apiUrl?: string;
  query?: Record<string, any>;
}

interface ModalStore {
  type: ModalType | null;
  data: ModalData;
  isOpen: boolean;
  onOpen: (type: ModalType, data?: ModalData) => void;
  onClose: () => void;
}

export const useModal = create<ModalStore>()((set) => ({
  type: null,
  data: {},
  isOpen: false,
  onOpen: (type = null, data = {}) => {
    set({ isOpen: true, type, data });
  },
  onClose: () => set({ type: null, isOpen: false }),
}));
