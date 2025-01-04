"use client";
import {
  DialogHeader,
  DialogContent,
  DialogDescription,
  DialogTitle,
  Dialog,
} from "../ui/dialog";
import qs from "query-string";
import { useModal } from "@/hooks/use-modal-store";
import { ScrollArea } from "../ui/scroll-area";
import UserAvatar from "../user-avatar";
import {
  Check,
  Gavel,
  Loader2,
  MoreVertical,
  Shield,
  ShieldCheck,
  ShieldQuestion,
} from "lucide-react";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { MemberRole } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
const roleIconMap = {
  GUEST: null,
  MODERATOR: <ShieldCheck className="h-4 w-4 ml-2 text-indigo-500" />,
  ADMIN: <ShieldCheck className="h-4 w-4 ml-2 text-rose-500" />,
};

const MembersModal = () => {
  const router = useRouter();
  const { isOpen, onClose, type, data, onOpen } = useModal();
  const { server } = data;
  const isModalOpen = isOpen && type === "members";

  const [loadingId, setLoadingId] = useState("");
  const onKick = async (memberId: string) => {
    try {
      setLoadingId(memberId);
      const url = qs.stringifyUrl({
        url: `/api/members/${memberId}`,
        query: {
          serverId: server.id,
        },
      });
      const res = await axios.delete(url);
      router.refresh();
      onOpen("members", { server: res.data });
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingId("");
    }
  };

  const onRoleChange = async (memberId: string, role: MemberRole) => {
    try {
      setLoadingId(memberId);
      const url = qs.stringifyUrl({
        url: `/api/members/${memberId}`,
        query: {
          serverId: server.id,
        },
      });
      const res = await axios.patch(url, { role });
      console.log(res.data);
      // router.refresh();
      onOpen("members", { server: res.data });
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingId("");
    }
  };
  return (
    <div>
      <Dialog open={isModalOpen} onOpenChange={onClose}>
        <DialogContent className="bg-white text-black  overflow-hidden">
          <DialogHeader className="px-6 pt-8">
            <DialogTitle className="text-2xl text-center font-bold">
              Manage Members
            </DialogTitle>
            <DialogDescription>
              {server?.members?.length} Members
            </DialogDescription>
          </DialogHeader>
          <ScrollArea>
            {server?.members?.map((member) => {
              return (
                <div key={member.id} className="flex items-center gap-x-2 mb-6">
                  <UserAvatar src={member.profile.imageUrl} />
                  <div className="flex flex-col gap-y-1">
                    <div className="text-xs font-semibold flex items-center gap-1">
                      {member.profile.name}
                      {roleIconMap[member.role]}
                    </div>
                    <p className="text-xs text-zinc-500">
                      {member.profile.email}
                    </p>
                  </div>
                  {server.profileId !== member.profileId &&
                    loadingId !== member.id && (
                      <div className="ml-auto">
                        <DropdownMenu>
                          <DropdownMenuTrigger>
                            <MoreVertical className="h-4 w-4 text-zinc-500" />
                            <DropdownMenuContent side="left">
                              <DropdownMenuSub>
                                <DropdownMenuSubTrigger className="flex items-center">
                                  <ShieldQuestion className="w-4 h-4 mr-2" />
                                  <span>Role</span>
                                </DropdownMenuSubTrigger>
                                <DropdownMenuPortal>
                                  <DropdownMenuSubContent>
                                    <DropdownMenuItem
                                      onClick={() => {
                                        onRoleChange(member.id, "GUEST");
                                      }}
                                    >
                                      <Shield className="mr-2" size={16} />
                                      Guest
                                      {member.role === "GUEST" && (
                                        <Check size={16} className="ml-auto" />
                                      )}
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                      onClick={() => {
                                        onRoleChange(member.id, "MODERATOR");
                                      }}
                                    >
                                      <ShieldCheck className="mr-2" size={16} />
                                      Moderator
                                      {member.role === "MODERATOR" && (
                                        <Check size={16} className="ml-auto" />
                                      )}
                                    </DropdownMenuItem>
                                  </DropdownMenuSubContent>
                                </DropdownMenuPortal>
                              </DropdownMenuSub>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem
                                onClick={() => onKick(member.id)}
                              >
                                <Gavel className="h-4 w-4 mr-2" />
                                Kick
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenuTrigger>
                        </DropdownMenu>
                      </div>
                    )}
                  {loadingId === member.id && (
                    <Loader2 className="animate-spin text-zinc-500 ml-auto w-4 h-4" />
                  )}
                </div>
              );
            })}
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MembersModal;
