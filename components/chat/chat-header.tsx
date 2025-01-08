import { Hash, Menu } from "lucide-react";
import MobileToggle from "../mobile-toggle";

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
  border-neutral-200 dark:border-neutral-800 border-b-2 "
    >
      <MobileToggle serverId={serverId} />
      {type === "channel" && (
        <Hash className="w-4 h-4 mr-1 text-zinc-500 dark:text-zinc-400" />
      )}
      <p className="font-semibold text-xl text-black dark:text-white">{name}</p>
    </div>
  );
};

export default ChatHeader;
