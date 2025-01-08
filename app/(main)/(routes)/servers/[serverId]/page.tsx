import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
interface ServerIdPage {
  params: {
    serverId: string;
  };
}

const ServerIdPage = async ({ params }: ServerIdPage) => {
  const profile = await currentProfile();
  const { redirectToSignIn } = await auth();

  if (!profile) {
    return redirectToSignIn();
  }

  const server = await db.server.findUnique({
    where: {
      id: params.serverId,
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
    include: {
      channels: {
        where: {
          name: "general",
        },
        orderBy: {
          createdAt: "asc",
        },
      },
    },
  });
  const inititalChannel = server?.channels[0];
  if (inititalChannel?.name !== "general") {
    return null;
  }
  return redirect(
    `/servers/${params.serverId}/channels/${inititalChannel?.id}`
  );
};

export default ServerIdPage;
