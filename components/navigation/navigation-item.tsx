"use client";

import { cn } from "@/lib/utils";
import ActionTooltip from "../action-tooltip";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";

interface NavigationItemProps {
  id: string;
  imageUrl: string;
  name: string;
}

const NavigationItem = ({ id, imageUrl, name }: NavigationItemProps) => {
  const params = useParams();
  const router = useRouter();
  const onClick = () => {
    router.push(`/servers/${id}`);
  };
  return (
    <ActionTooltip side="right" align="center" label={name}>
      <button onClick={onClick} className="group relative flex items-center">
        <div
          className={cn(
            "absolute left-0 bg-primary rounded-r-full transition-all w-[4px]",
            params?.serverId !== id && "group-hover:h-[20px]",
            params?.serverId === id ? "h-[36px]" : "h-[8px]"
          )}
        ></div>
        <div
          className={cn(
            "relative group mx-3 w-12 h-12 rounded-3xl group-hover:rounded-xl transition-all overflow-hidden",
            params?.serverId === id && "bg-primary/70 text-primary rounded-2xl"
          )}
        >
          <Image fill src={imageUrl} alt="Channel"></Image>
        </div>
      </button>
    </ActionTooltip>
  );
};

export default NavigationItem;
