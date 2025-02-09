import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { MemberRole } from "@prisma/client";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const profile = await currentProfile();
    const { name, type } = await req.json();

    const { searchParams } = new URL(req.url);
    const serverId = searchParams.get("serverId");

    if (name === "general") {
      return new NextResponse("Name cannot be 'general", { status: 400 });
    }

    const server = await db.server.update({
      where: {
        id: serverId as string,
        members: {
          some: {
            profileId: profile?.id,
            role: {
              in: [MemberRole.ADMIN, MemberRole.MODERATOR],
            },
          },
        },
      },
      data: {
        channels: {
          create: {
            profileId: profile?.id,
            name,
            type,
          } as any,
        },
      },
    });
    return NextResponse.json(server);
  } catch (e) {
    console.log("CHANNELS_POST", e);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
