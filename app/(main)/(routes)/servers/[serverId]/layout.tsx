import ServerSidebar from "@/components/server/server-sidebar";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
const ServerIdLayout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { serverId: string };
}) => {
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
  });

  if (!server) {
    redirect("/");
  }
  return (
    <div>
      <div className="h-full">
        <div className="invisible md:visible md:flex h-full w-60 z-20 flex-col fixed inset-y-0 ">
          <ServerSidebar serverId={params.serverId} />
        </div>
        <main className="h-full md:pl-60">{children}</main>
      </div>
    </div>
  );
};

export default ServerIdLayout;
