import { Hash, Menu } from "lucide-react";
import MobileToggle from "../mobile-toggle";
import UserAvatar from "../user-avatar";
import { SocketIndicator } from "../socket-indicator";

interface ChatHeaderProps {
  serverId: string;
  name: string;
  type: "channel" | "conversation";
  imageUrl?: string;
}

const ChatHeader = ({ serverId, name, type, imageUrl }: ChatHeaderProps) => {
  return (
    <div
      className="text-xl font-semibold px-3 flex items-center h-12
  border-neutral-200 dark:border-neutral-800 border-b-2"
    >
      <MobileToggle serverId={serverId} />
      {type === "channel" && (
        <Hash className="w-4 h-4 mr-1 text-zinc-500 dark:text-zinc-400" />
      )}
      {type === "conversation" && (
        <UserAvatar src={imageUrl} className="h-7 w-7 mr-2" />
      )}
      <p className="font-semibold text-xl text-black dark:text-white">{name}</p>

      <div className="ml-auto flex items-center">
        <SocketIndicator />
      </div>
    </div>
  );
};

export default ChatHeader;
