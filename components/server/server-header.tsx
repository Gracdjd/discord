"use client";

import { ServerWithMemberWithProfiles } from "@/types";
import { MemberRole } from "@prisma/client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "../ui/dropdown-menu";
import {
  ChevronDown,
  LogOut,
  PlusCircle,
  Settings,
  Trash,
  UserPlus,
  Users,
} from "lucide-react";
import { useModal } from "@/hooks/use-modal-store";

interface ServerHeaderProps {
  server: ServerWithMemberWithProfiles;
  role?: MemberRole;
}

const ServerHeader = ({ server, role }: ServerHeaderProps) => {
  const isAdmin = role === MemberRole.ADMIN;
  const isModerator = isAdmin || role === MemberRole.MODERATOR;
  const { onOpen } = useModal();
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger className="focus:outline-none" asChild>
          <button
            className="w-full text-md font-semibold px-3 flex items-center h-12 border-neutral-200
            dark:border-neutral-800 border-b-2 hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 
            transition"
          >
            {server.name}
            <ChevronDown size={16} className="ml-auto " />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="w-56 text-xs font-medium text-black
         dark:text-neutral-400 space-y-[2px]"
        >
          {isModerator && (
            <DropdownMenuItem
              onClick={() => {
                onOpen("invite", { server });
                console.log(server);
              }}
              className="text-indigo-600 dark:text-indigo-400 px-3 py-2 text-sm 
            cursor-pointer"
            >
              Invite People
              <UserPlus size={16} className="ml-auto" />
            </DropdownMenuItem>
          )}
          {isAdmin && (
            <DropdownMenuItem
              onClick={() => {
                onOpen("editServer", { server });
              }}
              className="px-3 py-2 text-sm cursor-pointer"
            >
              Server Settings
              <Settings size={16} className="ml-auto" />
            </DropdownMenuItem>
          )}

          {isAdmin && (
            <DropdownMenuItem
              onClick={() => {
                onOpen("members", { server });
              }}
              className="px-3 py-2 text-sm cursor-pointer"
            >
              Manage Members
              <Users size={16} className="ml-auto" />
            </DropdownMenuItem>
          )}
          {isModerator && (
            <DropdownMenuItem className="px-3 py-2 text-sm cursor-pointer">
              Create Channel
              <PlusCircle size={16} className="ml-auto" />
            </DropdownMenuItem>
          )}
          {isModerator && <DropdownMenuSeparator />}
          {isAdmin && (
            <DropdownMenuItem className="px-3 py-2 text-sm cursor-pointer text-rose-500">
              Delete Server
              <Trash size={16} className="ml-auto" />
            </DropdownMenuItem>
          )}
          {!isAdmin && (
            <DropdownMenuItem className="px-3 py-2 text-sm cursor-pointer text-rose-500">
              Leave Server
              <LogOut size={16} className="ml-auto" />
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default ServerHeader;
