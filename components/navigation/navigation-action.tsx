"use client";

import { Plus } from "lucide-react";
import ActionTooltip from "../action-tooltip";
import { useModal } from "@/hooks/use-modal-store";

export const NavigationAction = () => {
  const { onOpen } = useModal();
  return (
    <div>
      <ActionTooltip side="right" align="center" label="Add a server">
        <button
          className="group flex items-center"
          onClick={() => onOpen("createServer")}
        >
          <div
            className="flex h-[48px] w-[48px] bg-background dark:bg-neutral-700
          group-hover:rounded-full transition-all overflow-hidden items-center 
          justify-center group-hover:bg-emerald-500
          "
          >
            <Plus size={14} />
          </div>
        </button>
      </ActionTooltip>
    </div>
  );
};
