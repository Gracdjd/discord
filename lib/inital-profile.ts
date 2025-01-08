import { currentUser, auth } from "@clerk/nextjs/server";
import { db } from "./db";
export const initialProfile = async () => {
  const user = await currentUser();
  const { redirectToSignIn } = await auth();
  if (!user) {
    return redirectToSignIn();
  }

  const profile = await db.profile.findUnique({
    where: {
      userId: user.id,
    },
  });

  if (
    profile.imageUrl !== user.imageUrl ||
    profile.name !== `${user.firstName} ${user.lastName}` ||
    profile.email !== user.emailAddresses[0].emailAddress
  ) {
    const updatedProfile = await db.profile.update({
      where: {
        userId: user.id,
      },
      data: {
        name: `${user.firstName} ${user.lastName}`,
        imageUrl: user.imageUrl,
        email: user.emailAddresses[0].emailAddress,
      },
    });
    return updatedProfile;
  }
  if (profile) {
    return profile;
  }

  const newProfile = await db.profile.create({
    data: {
      userId: user.id,
      name: `${user.firstName} ${user.lastName}`,
      imageUrl: user.imageUrl,
      email: user.emailAddresses[0].emailAddress,
    },
  });
  console.log(newProfile);
  return newProfile;
};
